import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';
import { GoogleUser } from 'src/users/interfaces/google-user.interface';

@Injectable()
export class GoogleAuthenticationServiceService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    /**
     * Injecting jwtConfigService
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    /**
     * Injecting the UserService
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * Injecting generate-tokens provider
     */
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  onModuleInit() {
    this.oauthClient = new OAuth2Client({
      clientId: this.jwtConfiguration.googleClientId,
      clientSecret: this.jwtConfiguration.googleClientSecret,
    });
  }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    try {
      // Verify the Google token
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });

      // Extract the payload
      const {
        sub: googleId,
        email,
        given_name: firstName,
        family_name: lastName,
      } = loginTicket.getPayload();

      // Find the user by the GoogleId
      const user = await this.usersService.findOneByGoogleId(googleId);

      // If googleId exists, generate tokens
      if (user) {
        return await this.generateTokensProvider.generateTokens(user);
      }

      // If googleId doesn't exist, create user and generate tokens
      const newUser = await this.usersService.createGoogleUser({
        googleId,
        email,
        firstName,
        lastName,
      } as GoogleUser);

      return await this.generateTokensProvider.generateTokens(newUser);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}

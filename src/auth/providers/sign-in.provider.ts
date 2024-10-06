import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SigninDto } from '../dtos/signin.dto';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export class SignInProvider {
  constructor(
    /**
     * Injecting the UsersService
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * Injecting the Hashing provider
     */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

    /**
     * Injecting JWT service
     */
    private readonly jwtService: JwtService,

    /**
     * Injecting JWT config
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signIn(signinDto: SigninDto) {
    // Find the user using Email
    // Not found throw an error
    const user = await this.usersService.findOneByEmail(signinDto.email);

    // Compare password
    let isEqual: boolean = false;
    try {
      isEqual = await this.hashingProvider.comparePassword(
        signinDto.password,
        user.password,
      );
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later.',
        {
          description: 'Could not compare the passwords',
        },
      );
    }

    // Wrong password throw an error
    if (!isEqual) {
      throw new UnauthorizedException('Incorrect password');
    }

    // Generate JWT token
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      } as ActiveUserData,
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
        issuer: this.jwtConfiguration.issuer,
        audience: this.jwtConfiguration.audience,
      },
    );

    // Send confirmation
    return {
      accessToken,
    };
  }
}

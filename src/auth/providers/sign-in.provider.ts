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
import { GenerateTokensProvider } from './generate-tokens.provider';

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
     * Injecting generate-tokens provider
     */
    private readonly generateTokensProvider: GenerateTokensProvider,
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

    // Send confirmation
    return await this.generateTokensProvider.generateTokens(user);
  }
}

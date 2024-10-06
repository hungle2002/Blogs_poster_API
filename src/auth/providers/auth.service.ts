import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SigninDto } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokenProvider } from './refresh-token.provider';

@Injectable()
export class AuthService {
  constructor(
    /**
     * Injecting the UsersService
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * Injecting sign-in provider
     */
    private readonly signInProvider: SignInProvider,

    /**
     * Injecting refresh-token provider
     */
    private readonly refreshTokenProvider: RefreshTokenProvider,
  ) {}

  public async signIn(signinDto: SigninDto) {
    return await this.signInProvider.signIn(signinDto);
  }

  public async refreshToken(refreshTokenDto: any) {
    return await this.refreshTokenProvider.refreshToken(refreshTokenDto);
  }

  public isAuth() {
    return true;
  }
}

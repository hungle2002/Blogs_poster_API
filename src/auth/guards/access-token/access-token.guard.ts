import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/auth/config/jwt.config';
import { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    /**
     * Injecting the JWTservice
     */
    private readonly jwtService: JwtService,

    /**
     * Injecting the JWTconfig
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Extract the request from the context
    const request = context.switchToHttp().getRequest();
    // Extract the token from the header
    const token = this.extractTokenFromHeader(request);
    // Verify the token
    if (!token) {
      throw new UnauthorizedException('Access token not found');
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );
      request[REQUEST_USER_KEY] = payload;
    } catch {
      throw new UnauthorizedException('Invalid access token');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}

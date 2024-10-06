import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType: AuthType = AuthType.Bearer;

  private readonly authTypeGuardmap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: { canActivate: () => true },
  };

  constructor(
    /**
     * Injecting Refector
     */
    private readonly refector: Reflector,

    /**
     * Injecting the AccessTokenGuard
     */
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Default error
    const error = new UnauthorizedException();

    // Get authType from the request using reflector
    const authTypes = this.refector.getAllAndOverride(AUTH_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [AuthenticationGuard.defaultAuthType];

    // Array of guards applied to the route
    const guards = authTypes
      .map((type: AuthType) => this.authTypeGuardmap[type])
      .flat();

    for (const guard of guards) {
      const canActivate = await Promise.resolve(
        guard.canActivate(context),
      ).catch((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        error: err;
      });

      if (canActivate) {
        return true;
      }
    }

    throw error;
  }
}

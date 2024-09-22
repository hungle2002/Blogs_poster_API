import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    /**
     * Injecting the UsersService
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  public login(email: string, password: string, id: number) {
    // Check user exists
    const user = this.usersService.findOneById(id);
    // Return token
    return 'SAMPLE_TOKEN';
  }

  public isAuth() {
    return true;
  }
}

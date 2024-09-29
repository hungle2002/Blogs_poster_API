import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersService {
  /**
   *  Injecting dependencies
   */
  constructor(
    /**
     * Injecting the AuthService
     */
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    /**
     * Injecting the UsersRepository
     */
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Create new user
   * @param createUserDto
   * @returns boolean
   */
  public async createUser(createUserDto: CreateUserDto) {
    // Check user exists with the same email
    const existingUser = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });
    if (existingUser) {
      return false;
    }
    // Handle exception
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  /**
   * Find all users
   * @param getUsersParamDto
   * @param limit
   * @param page
   * @returns User[]
   */
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    // Check if the user is authenticated
    const isAuth = this.authService.isAuth();
    console.log('isAuth', isAuth);

    return [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      },
    ];
  }

  /**
   * Find a user by id
   * @param id
   * @returns User
   */
  public async findOneById(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }
}

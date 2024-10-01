import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
  forwardRef,
} from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import profileConfig from '../config/profile.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class UsersService {
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
    private readonly usersRepository: Repository<User>,

    /**
     * Injecting Config service
     */
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,
  ) {}

  /**
   * Create new user
   * @param createUserDto
   * @returns boolean
   */
  public async createUser(createUserDto: CreateUserDto) {
    let existingUser = undefined;

    try {
      // Check user exists with the same email
      existingUser = await this.usersRepository.findOneBy({
        email: createUserDto.email,
      });
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later.',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    // Handle duplicate email
    if (existingUser) {
      throw new BadRequestException(
        'User already exists, please check your email',
      );
    }
    // Create a new user
    let newUser = this.usersRepository.create(createUserDto);

    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later.',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    return newUser;
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
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: 'The API endpoint does not exist',
        fileName: 'users.service.ts',
        lineNumber: 101,
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        cause: new Error(),
        description: 'Occured because the API endpoint was removed permanently',
      },
    );
  }

  /**
   * Find a user by id
   * @param id
   * @returns User
   */
  public async findOneById(id: number) {
    let user = undefined;

    try {
      user = await this.usersRepository.findOneBy({ id });
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later.',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    // Handle user not found
    if (!user) {
      throw new BadRequestException('The user id does not exist');
    }

    return user;
  }
}

import {
  BadRequestException,
  Inject,
  Injectable,
  RequestTimeoutException,
  forwardRef,
} from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import profileConfig from '../config/profile.config';
import { ConfigType } from '@nestjs/config';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { CreateUserProvider } from './create-user.provider';
import { Repository } from 'typeorm';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { GoogleUser } from '../interfaces/google-user.interface';

@Injectable()
export class UsersService {
  constructor(
    /**
     * Injecting the UsersRepository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    /**
     * Injecting users-create-many provider
     */
    private readonly usersCreateManyProvider: UsersCreateManyProvider,

    /**
     * Injecting create-user provider
     */
    private readonly createUserProvider: CreateUserProvider,

    /**
     * Injecting find-one-user-by-email provider
     */
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,

    /**
     * Injecting find-one-by-google-id provider
     */
    private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,

    /**
     * Injecting create-google-user provider
     */
    private readonly createGoogleUserProvider: CreateGoogleUserProvider,
  ) {}

  /**
   * Create new user
   * @param createUserDto
   * @returns boolean
   */
  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
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
    return this.usersRepository.find();
    // throw new HttpException(
    //   {
    //     status: HttpStatus.MOVED_PERMANENTLY,
    //     error: 'The API endpoint does not exist',
    //     fileName: 'users.service.ts',
    //     lineNumber: 101,
    //   },
    //   HttpStatus.MOVED_PERMANENTLY,
    //   {
    //     cause: new Error(),
    //     description: 'Occured because the API endpoint was removed permanently',
    //   },
    // );
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

  /**
   * Create many users
   * @param users
   * @returns
   */
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.usersCreateManyProvider.createMany(createManyUsersDto);
  }

  /**
   * Find a user by email
   * @param email
   * @returns
   */
  public async findOneByEmail(email: string) {
    return await this.findOneUserByEmailProvider.findOneByEmail(email);
  }

  /**
   * Find a user by googleId
   * @param googleId
   * @returns
   */
  public async findOneByGoogleId(googleId: string) {
    return await this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
  }

  /**
   * Create a new google user
   * @param googleUser
   * @returns
   */
  public async createGoogleUser(googleUser: GoogleUser) {
    return await this.createGoogleUserProvider.createGoogleUser(googleUser);
  }
}

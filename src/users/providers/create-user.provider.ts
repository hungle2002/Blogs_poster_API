import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { MailService } from 'src/mail/providers/mail.service';

@Injectable()
export class CreateUserProvider {
  constructor(
    /**
     * Injecting the UsersRepository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    /**
     * Injecting Hashing provider
     */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

    /**
     * Injecting mailService
     */
    private readonly mailService: MailService,
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
    let newUser = this.usersRepository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password),
    });

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

    // Send welcome email
    try {
      await this.mailService.sendUserWelcome(newUser);
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
    return newUser;
  }
}

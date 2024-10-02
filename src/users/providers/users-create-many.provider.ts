import {
  BadRequestException,
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { DataSource, In, Repository } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    /**
     * Injecting Datasource
     */
    private readonly dataSource: DataSource,

    /**
     * Injecting User repository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Create many users
   * @param users
   * @returns
   */
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    // Checking all email of all users
    if (createManyUsersDto.users.length) {
      const emails = createManyUsersDto.users.map((user) => user.email);
      // Checking duplcate email
      if (emails.length !== new Set(emails).size) {
        throw new BadRequestException('Duplicate email found');
      }
      // Checking existing email
      const existingUsers = await this.usersRepository.find({
        where: { email: In(emails) },
      });

      if (existingUsers.length) {
        throw new BadRequestException(
          'User already exists, please check your email',
        );
      }
    }

    const newUsers: User[] = [];
    // Create a query runner instance
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      // Connect Query instance to data source
      await queryRunner.connect();

      // Start the transaction
      await queryRunner.startTransaction();
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later.',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    try {
      for (const user of createManyUsersDto.users) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }

      // If successful, commit the transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      // If unsuccessful, rollback the transaction
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Could not complete the transaction', {
        description: String(error),
      });
    } finally {
      try {
        // Release connection
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException(
          'Unable to release connection. Please try again later.',
          {
            description: String(error),
          },
        );
      }
    }

    return newUsers;
  }
}

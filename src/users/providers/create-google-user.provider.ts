import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { GoogleUser } from '../interfaces/google-user.interface';

@Injectable()
export class CreateGoogleUserProvider {
  constructor(
    /**
     * Injecting the UsersRepository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async createGoogleUser(googleUser: GoogleUser) {
    try {
      const user = this.usersRepository.create(googleUser);
      return await this.usersRepository.save(user);
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException({
        description: 'Unable to create a new google user',
      });
    }
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { DataSource, Repository } from 'typeorm';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T = any>(): MockRepository<T> => {
  return {
    create: jest.fn(),
    save: jest.fn(),
  };
};

describe('UserService', () => {
  let provider: CreateGoogleUserProvider;
  let userRepository: MockRepository<User>;
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'j@j.com',
    googleId: '12345',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateGoogleUserProvider,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(User), useValue: createMockRepository() },
      ],
    }).compile();

    provider = module.get<CreateGoogleUserProvider>(CreateGoogleUserProvider);
    userRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
  });

  it('Should be defined"', () => {
    expect(provider).toBeDefined();
  });

  describe('createGoogleUser', () => {
    it('Should create a new google user', async () => {
      // ARRANGE
      userRepository.create.mockReturnValue(user);
      userRepository.save.mockReturnValue(user);

      // ACT
      const newUser = await provider.createGoogleUser(user);

      // ASSERT
      expect(userRepository.create).toHaveBeenCalledWith(user);
      expect(userRepository.save).toHaveBeenCalledWith(newUser);
      expect(newUser.googleId).toEqual(user.googleId);
    });
  });
});

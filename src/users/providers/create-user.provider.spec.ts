import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserProvider } from './create-user.provider';
import { MailService } from 'src/mail/providers/mail.service';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { DataSource, Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

describe('CreateUserProvider', () => {
  let provider: CreateUserProvider;
  let usersRepository: MockRepository;
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'j@j.com',
    password: 'password',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserProvider,
        { provide: DataSource, useValue: {} },
        {
          provide: MailService,
          useValue: { sendUserWelcome: jest.fn(() => Promise.resolve()) },
        },
        {
          provide: HashingProvider,
          useValue: {
            hashPassword: jest.fn(() => Promise.resolve('password')),
          },
        },
        { provide: getRepositoryToken(User), useValue: createMockRepository() },
      ],
    }).compile();

    provider = module.get<CreateUserProvider>(CreateUserProvider);
    usersRepository = module.get<MockRepository>(getRepositoryToken(User));
  });

  it('Should be defined"', () => {
    expect(provider).toBeDefined();
  });

  describe('createUser', () => {
    describe('When user does not exist in the database', () => {
      it('Should create a new user', async () => {
        // ARRANGE: Mock method return value
        usersRepository.findOneBy.mockReturnValue(null);
        usersRepository.create.mockReturnValue(user);
        usersRepository.save.mockReturnValue(user);

        // ACT: create new user
        const newUser = await provider.createUser(user);

        // ASSERT: check expectations
        expect(usersRepository.findOneBy).toHaveBeenCalledWith({
          email: user.email,
        });
        expect(usersRepository.create).toHaveBeenCalledWith(user);
        expect(usersRepository.save).toHaveBeenCalledWith(user);
        expect(newUser.email).toEqual(user.email);
      });
    });
    describe('When user exists in the database', () => {
      it('Should throw BadRequestException', async () => {
        // ARRANGE: Mock method return value
        usersRepository.findOneBy.mockReturnValue(user);
        usersRepository.create.mockReturnValue(user);
        usersRepository.save.mockReturnValue(user);

        // ACT: create new user
        try {
          await provider.createUser(user);
        } catch (error) {
          // ASSERT: check expectations
          expect(error).toBeInstanceOf(BadRequestException);
        }
      });
    });
  });
});

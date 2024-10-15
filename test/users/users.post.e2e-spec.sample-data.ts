import { faker } from '@faker-js/faker';

export const completeUser = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  password: '@Lehung2002',
};

export const missingFirstNameUser = {
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  password: '@Lehung2002',
};

export const missingLastNameUser = {
  firstName: faker.person.firstName(),
  email: faker.internet.email(),
  password: '@Lehung2002',
};

export const missingEmailUser = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  password: '@Lehung2002',
};

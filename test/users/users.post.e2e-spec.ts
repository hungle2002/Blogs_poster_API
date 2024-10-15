import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { dropDatabase } from 'test/helpers/drop-database.helper';
import * as request from 'supertest';
import { bootstrapNestApplication } from 'test/helpers/bootstrap-nest-application.helper';
import {
  completeUser,
  missingEmailUser,
  missingFirstNameUser,
  missingLastNameUser,
} from './users.post.e2e-spec.sample-data';

describe('[Users] @Post Endpoints (e2e)', () => {
  let app: INestApplication;
  let config: ConfigService;

  beforeEach(async () => {
    // Create the NestJS application
    app = await bootstrapNestApplication();

    // Get the configuration service
    config = app.get<ConfigService>(ConfigService);

    // Clear database
    await app.init();
  });

  afterEach(async () => {
    // Clear database to avoid conflicts
    await dropDatabase(config);
    await app.close();
  });

  it('/users - Endpoints is public', () => {
    return request(app.getHttpServer()).post('/users').send({}).expect(400);
  });

  it('/users - firstName is mandatory', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(missingFirstNameUser)
      .expect(400);
  });

  it('/users - lastName is mandatory', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(missingLastNameUser)
      .expect(400);
  });

  it('/users - email is mandatory', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(missingEmailUser)
      .expect(400);
  });

  it('/users - Valid request successfully creates user', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(completeUser)
      .expect(201)
      .then(({ body }) => {
        console.log(body);
        expect(body.data).toBeDefined();
        expect(body.data.firstName).toEqual(completeUser.firstName);
        expect(body.data.lastName).toEqual(completeUser.lastName);
        expect(body.data.email).toEqual(completeUser.email);
      });
  });

  it('/users - password is not returned in response', async () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(completeUser)
      .expect(201)
      .then(({ body }) => {
        expect(body.data.password).toBeUndefined();
      });
  });

  it('/users - googleId is not returned in response', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(completeUser)
      .expect(201)
      .then(({ body }) => {
        expect(body.data.password).toBeUndefined();
      });
  });
});

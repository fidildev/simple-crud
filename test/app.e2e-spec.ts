import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../src/user/user.module';
import { CreateUserDto } from '../src/user/dto/create-user.dto';
import { UpdateUserDto } from '../src/user/dto/update-user.dto';

describe('User (e2e)', () => {
  let app: INestApplication;
  const createUserBody = new CreateUserDto(
    'Dave',
    'Nothere',
    'dave@nothere.com',
  );

  const createUserResponse = {
    id: 'ca7b91c5-b825-482b-9b8b-af9c538bd1fe',
    firstName: 'Dave',
    lastName: 'Nothere',
    email: 'dave@nothere.com',
  };

  const getAllUsersResponse = [createUserResponse];

  const updateUserBody = new UpdateUserDto(
    'Bill',
    'Nothere',
    'bill@nothere.com',
  );

  const updatedUserResponse = {
    id: 'ca7b91c5-b825-482b-9b8b-af9c538bd1fe',
    firstName: 'Bill',
    lastName: 'Nothere',
    email: 'bill@nothere.com',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user (GET)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect(getAllUsersResponse);
  });

  it('/user (POST)', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send(createUserBody)
      .expect(201)
      .expect(createUserResponse);
  });

  it('/user/id (ById)', () => {
    return request(app.getHttpServer())
      .get(`/user/${createUserResponse.id}`)
      .expect(200)
      .expect(createUserResponse);
  });

  it('/user/id (PATCH)', () => {
    return request(app.getHttpServer())
      .patch(`/user/${createUserResponse.id}`)
      .send(updateUserBody)
      .expect(200)
      .expect(updatedUserResponse);
  });
});

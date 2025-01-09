import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { response } from 'express';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useLogger(false);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /user/register', () => {
    const stamp = new Date().getTime();
    const testUserName = `test-user-${stamp}`;
    return request(app.getHttpServer())
      .post('/user/register')
      .send({
        username: testUserName,
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('username', testUserName);
      });
  });

  it('GET /user/:username/sentiments', () => {
    const testUserName = `user-1`;
    return request(app.getHttpServer())
      .get(`/user/${testUserName}/sentiments`)
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBeTruthy();
      });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('SentimentController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication()
    app.useLogger(false);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /sentiment/analyze', () => {
    return request(app.getHttpServer())
      .post('/sentiment/analyze')
      .send({
        username: 'user-1',
        text: "I'm happy"
      })
      .expect(201)
      .then( response => {
        expect(response.body).toHaveProperty('text');
        expect(response.body).toHaveProperty('score');
        expect(response.body).toHaveProperty('magnitude');
      });
  });
});

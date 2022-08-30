import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, VersioningType } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.enableVersioning({
      type: VersioningType.HEADER,
      header: 'X-API-Version',
    });
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET) V1', () => {
    return request(app.getHttpServer())
      .get('/')
      .set({
        'X-API-Version': '1',
      })
      .expect(200)
      .expect('1');
  });

  it('/ (GET) V2', () => {
    return request(app.getHttpServer())
      .get('/')
      .set({
        'X-API-Version': '2',
      })
      .expect(200)
      .expect('2');
  });

  it('/ (GET) No Version', () => {
    return request(app.getHttpServer())
      .get('/')
      .set({
        'X-API-Version': '3',
      })
      .expect(404);
  });
});

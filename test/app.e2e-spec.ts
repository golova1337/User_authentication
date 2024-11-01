import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { MockAuthGuard } from './guard/guard.mock';
import { SignInDto } from 'src/auth/dto/create-auth.dto';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AccessTokenGuard)
      .useClass(MockAuthGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (Sign-in)', async () => {
    const user: SignInDto = {
      username: 'Petya',
      email: 's222af@gmail.com',
      password: 'Example123456!',
      passwordRepeat: 'Example123456!',
    };
    const response = await request(app.getHttpServer())
      .post('/auth/sing-in')
      .send(user)
      .expect(201);

    const createdUser = response.body;
    expect(createdUser[0].email).toBe(user.email);
  });

  it('/ (Sign-in) duplicate', async () => {
    const user: SignInDto = {
      username: 'Petya',
      email: 's222af@gmail.com',
      password: 'Example123456!',
      passwordRepeat: 'Example123456!',
    };
    return request(app.getHttpServer())
      .post('/auth/sing-in')
      .send(user)
      .expect(500);
  });

  it('/ (login)', async () => {
    const user = {
      email: 's222af@gmail.com',
      password: 'Example123456!',
    };
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(user)
      .expect(200);

    const tokens = response.body;
    expect(tokens).toHaveProperty('accessToken');
    expect(tokens).toHaveProperty('refreshToken');
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/auth/info').expect(200);
  });
});

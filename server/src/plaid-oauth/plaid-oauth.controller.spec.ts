import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { PlaidOauthController } from './plaid-oauth.controller';
import { PlaidOauthService } from './plaid-oauth.service';

describe('PlaidOauthController', () => {
  let controller: PlaidOauthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [PlaidOauthController],
      providers: [PlaidOauthService],
    }).compile();

    controller = module.get<PlaidOauthController>(PlaidOauthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { PlaidModule } from '../plaid/plaid.module';
import { TypeOrmTestingModule } from '../utils/test-utils/type-orm-testing-module';
import { PlaidOauthController } from './plaid-oauth.controller';
import { PlaidOauthService } from './plaid-oauth.service';

describe('PlaidOauthController', () => {
  let controller: PlaidOauthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule(), PlaidModule],
      controllers: [PlaidOauthController],
      providers: [PlaidOauthService],
    }).compile();

    controller = module.get<PlaidOauthController>(PlaidOauthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

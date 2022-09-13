import { Test, TestingModule } from '@nestjs/testing';
import { PlaidModule } from '../plaid/plaid.module';
import { TypeOrmTestingModule } from '../utils/test-utils/type-orm-testing-module';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';

describe('OauthController', () => {
  let controller: OauthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule(), PlaidModule],
      controllers: [OauthController],
      providers: [OauthService],
    }).compile();

    controller = module.get<OauthController>(OauthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

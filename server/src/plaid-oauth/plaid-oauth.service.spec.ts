import { Test, TestingModule } from '@nestjs/testing';
import { PlaidOauthService } from './plaid-oauth.service';
import { AppModule } from '../app.module';
import { TypeOrmTestingModule } from '../utils/test-utils/type-orm-testing-module';
import { PlaidModule } from '../plaid/plaid.module';

describe('PlaidOauthService', () => {
  let service: PlaidOauthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule(), PlaidModule],
      providers: [PlaidOauthService],
    }).compile();

    service = module.get<PlaidOauthService>(PlaidOauthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

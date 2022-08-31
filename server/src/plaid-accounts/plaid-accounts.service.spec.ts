import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingModule } from '../utils/test-utils/type-orm-testing-module';
import { PlaidAccount } from './entities/plaid-account.entity';
import { PlaidAccountsService } from './plaid-accounts.service';

describe('PlaidAccountsService', () => {
  let service: PlaidAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule()],
      providers: [PlaidAccountsService],
    }).compile();

    service = module.get<PlaidAccountsService>(PlaidAccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

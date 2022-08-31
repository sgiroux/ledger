import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Rule } from '../rules/entities/rule.entity';
import { RulesModule } from '../rules/rules.module';
import { TypeOrmTestingModule } from '../utils/test-utils/type-orm-testing-module';
import { PlaidTransaction } from './entities/plaid-transaction.entity';
import { PlaidTransactionsService } from './plaid-transactions.service';

describe('PlaidTransactionsService', () => {
  let service: PlaidTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule(), RulesModule],
      providers: [PlaidTransactionsService],
    }).compile();

    service = module.get<PlaidTransactionsService>(PlaidTransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

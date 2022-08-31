import { Test, TestingModule } from '@nestjs/testing';
import { PlaidAccountsModule } from '../plaid-accounts/plaid-accounts.module';
import { PlaidTransactionsModule } from '../plaid-transactions/plaid-transactions.module';
import { RulesModule } from '../rules/rules.module';
import { TypeOrmTestingModule } from '../utils/test-utils/type-orm-testing-module';
import { StatsService } from './stats.service';

describe('StatsService', () => {
  let service: StatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...TypeOrmTestingModule(),
        PlaidTransactionsModule,
        PlaidAccountsModule,
        RulesModule,
      ],
      providers: [StatsService],
    }).compile();

    service = module.get<StatsService>(StatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

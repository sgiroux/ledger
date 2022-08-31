import { Test, TestingModule } from '@nestjs/testing';
import { PlaidAccountsModule } from '../plaid-accounts/plaid-accounts.module';
import { PlaidTransactionsModule } from '../plaid-transactions/plaid-transactions.module';
import { RulesModule } from '../rules/rules.module';
import { TypeOrmTestingModule } from '../utils/test-utils/type-orm-testing-module';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

describe('StatsController', () => {
  let controller: StatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...TypeOrmTestingModule(),
        PlaidTransactionsModule,
        PlaidAccountsModule,
        RulesModule,
      ],
      controllers: [StatsController],
      providers: [StatsService],
    }).compile();

    controller = module.get<StatsController>(StatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

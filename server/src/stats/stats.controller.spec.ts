import { Test, TestingModule } from '@nestjs/testing';
import { AccountsModule } from '../accounts/accounts.module';
import { TransactionsModule } from '../transactions/transactions.module';
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
        TransactionsModule,
        AccountsModule,
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

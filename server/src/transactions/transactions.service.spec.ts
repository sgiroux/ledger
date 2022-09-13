import { Test, TestingModule } from '@nestjs/testing';
import { RulesModule } from '../rules/rules.module';
import { TypeOrmTestingModule } from '../utils/test-utils/type-orm-testing-module';
import { TransactionsService } from './transactions.service';

describe('TransactionsService', () => {
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule(), RulesModule],
      providers: [TransactionsService],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

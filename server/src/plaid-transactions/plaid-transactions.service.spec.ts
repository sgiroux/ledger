import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlaidTransaction } from './entities/plaid-transaction.entity';
import { PlaidTransactionsService } from './plaid-transactions.service';

describe('PlaidTransactionsService', () => {
  let service: PlaidTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaidTransactionsService,
        {
          provide: getRepositoryToken(PlaidTransaction),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOneOrFail: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockReturnValue(true),
            save: jest.fn(),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            update: jest.fn().mockResolvedValue(true),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<PlaidTransactionsService>(PlaidTransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

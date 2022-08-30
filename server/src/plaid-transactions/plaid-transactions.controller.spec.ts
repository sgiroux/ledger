import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '../app.module';
import { PlaidTransaction } from './entities/plaid-transaction.entity';
import { PlaidTransactionsController } from './plaid-transactions.controller';
import { PlaidTransactionsService } from './plaid-transactions.service';

describe('PlaidTransactionsController', () => {
  let controller: PlaidTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [PlaidTransactionsController],
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

    controller = module.get<PlaidTransactionsController>(
      PlaidTransactionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

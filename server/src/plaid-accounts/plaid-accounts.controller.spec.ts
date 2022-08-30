import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '../app.module';
import { PlaidAccount } from './entities/plaid-account.entity';
import { PlaidAccountsController } from './plaid-accounts.controller';
import { PlaidAccountsService } from './plaid-accounts.service';

describe('PlaidAccountsController', () => {
  let controller: PlaidAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [PlaidAccountsController],
      providers: [
        PlaidAccountsService,
        {
          provide: getRepositoryToken(PlaidAccount),
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

    controller = module.get<PlaidAccountsController>(PlaidAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

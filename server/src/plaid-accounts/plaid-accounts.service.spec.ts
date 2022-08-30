import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlaidAccount } from './entities/plaid-account.entity';
import { PlaidAccountsService } from './plaid-accounts.service';

describe('PlaidAccountsService', () => {
  let service: PlaidAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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
        PlaidAccountsService,
      ],
    }).compile();

    service = module.get<PlaidAccountsService>(PlaidAccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '../app.module';
import { PlaidItem } from './entities/plaid-item.entity';
import { PlaidItemsService } from './plaid-items.service';

describe('PlaidItemsService', () => {
  let service: PlaidItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        PlaidItemsService,
        {
          provide: getRepositoryToken(PlaidItem),
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

    service = module.get<PlaidItemsService>(PlaidItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

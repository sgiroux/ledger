import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '../app.module';
import { PlaidItem } from './entities/plaid-item.entity';
import { PlaidItemsController } from './plaid-items.controller';
import { PlaidItemsService } from './plaid-items.service';

describe('PlaidItemsController', () => {
  let controller: PlaidItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaidItemsController],
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
      imports: [AppModule],
    }).compile();

    controller = module.get<PlaidItemsController>(PlaidItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TestingService } from '../testing/testing.service';
import { TypeOrmTestingModule } from '../utils/test-utils/type-orm-testing-module';
import { ItemsService } from './items.service';

describe('PlaidItemsService', () => {
  let service: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule()],
      providers: [ItemsService],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    const testingService = module.get<TestingService>(TestingService);
    await testingService.createMockData();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('selectAllByUser - should return all items for a user', async () => {
    const items = await service.selectAllByUserId(1);
    expect(items).toBeInstanceOf(Array);
    expect(items).toHaveLength(1);
  });

  it('selectAllByUser - should return no items for a user', async () => {
    const items = await service.selectAllByUserId(1000);
    expect(items).toBeInstanceOf(Array);
    expect(items).toHaveLength(0);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingModule } from '../utils/test-utils/type-orm-testing-module';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

describe('PlaidItemsController', () => {
  let controller: ItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [ItemsService],
      imports: [...TypeOrmTestingModule()],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

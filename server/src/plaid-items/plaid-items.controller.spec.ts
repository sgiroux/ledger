import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '../app.module';
import { TypeOrmTestingModule } from '../utils/test-utils/type-orm-testing-module';
import { PlaidItem } from './entities/plaid-item.entity';
import { PlaidItemsController } from './plaid-items.controller';
import { PlaidItemsService } from './plaid-items.service';

describe('PlaidItemsController', () => {
  let controller: PlaidItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaidItemsController],
      providers: [PlaidItemsService],
      imports: [...TypeOrmTestingModule()],
    }).compile();

    controller = module.get<PlaidItemsController>(PlaidItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

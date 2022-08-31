import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingModule } from '../utils/test-utils/type-orm-testing-module';
import { RulesController } from './rules.controller';
import { RulesService } from './rules.service';

describe('RulesController', () => {
  let controller: RulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule()],
      controllers: [RulesController],
      providers: [RulesService],
    }).compile();

    controller = module.get<RulesController>(RulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

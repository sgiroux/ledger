import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingModule } from '../utils/test-utils/type-orm-testing-module';
import { RulesService } from './rules.service';

describe('RulesService', () => {
  let service: RulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule()],
      providers: [RulesService],
    }).compile();

    service = module.get<RulesService>(RulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

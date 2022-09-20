import { Test, TestingModule } from '@nestjs/testing';
import { DuplicateRuleNameException } from '../exceptions/duplicateRuleNameException';
import { TestingService } from '../testing/testing.service';
import { TypeOrmTestingModule } from '../utils/test-utils/type-orm-testing-module';
import { CreateRuleDTO } from './dto/create-rule.dto';
import { UpdateRuleDTO } from './dto/update-rule.dto';
import { Rule } from './entities/rule.entity';
import { RulesService } from './rules.service';

describe('RulesService', () => {
  let service: RulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule()],
      providers: [RulesService],
    }).compile();

    service = module.get<RulesService>(RulesService);
    const testingService = module.get<TestingService>(TestingService);
    await testingService.createMockData();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('selectAllByUserId - should return all the rules for a user', async () => {
    const rules = await service.selectAllByUserId(1);
    expect(rules).toBeInstanceOf(Array);
    expect(rules).toHaveLength(2);
  });

  it('selectById - should return a rule by id', async () => {
    const rule = await service.selectById(1, 1);
    expect(rule).toBeInstanceOf(Rule);
    expect(rule.id).toBe(1);
  });

  it('delete - should delete a rule by an id', async () => {
    await service.delete(1, 1);
    const rules = await service.selectAllByUserId(1);
    expect(rules).toBeInstanceOf(Array);
    expect(rules).toHaveLength(1);
    expect(rules[0].id).toBe(2);
  });

  it('create - should create a rule', async () => {
    const createRuleDTO = new CreateRuleDTO();
    createRuleDTO.operation = 'contains';
    createRuleDTO.name = 'newRule';
    createRuleDTO.isEnabled = false;
    createRuleDTO.field = 'name';
    createRuleDTO.criteria = 'test';

    const rule = await service.create(1, createRuleDTO);
    expect(rule).toBeInstanceOf(Rule);
    expect(rule.id).toBe(3);
    expect(rule.isEnabled).toBe(false);
  });

  it('update: should update a rule', async () => {
    const updateName = 'Updated Name';

    const rule = await service.selectById(1, 1);
    expect(rule).toBeInstanceOf(Rule);
    expect(rule.id).toBe(1);
    expect(rule.isEnabled).toBe(true);

    const updateRuleDTO = new UpdateRuleDTO();
    updateRuleDTO.isEnabled = false;
    updateRuleDTO.name = updateName;

    const updatedRule = await service.update(1, 1, updateRuleDTO);
    expect(updatedRule.isEnabled).toBe(false);
    expect(updatedRule.name).toBe(updateName);
  });

  it('create: should prevent duplicate named rules', async () => {
    const createRuleDTO = new CreateRuleDTO();
    createRuleDTO.operation = 'contains';
    createRuleDTO.name = 'rule1';
    createRuleDTO.isEnabled = false;
    createRuleDTO.field = 'name';
    createRuleDTO.criteria = 'test';
    await expect(service.create(1, createRuleDTO)).rejects.toThrowError(
      DuplicateRuleNameException,
    );
  });

  it('update: should prevent duplicate rule names', async () => {
    const updateRuleDTO = new UpdateRuleDTO();
    updateRuleDTO.name = 'rule1';

    await expect(service.update(1, 1, updateRuleDTO)).rejects.toThrowError(
      DuplicateRuleNameException,
    );
  });
});

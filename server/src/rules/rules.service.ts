import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DuplicateRuleNameException } from '../exceptions/duplicateRuleNameException';
import { User } from '../users/entities/user.entity';
import { CreateRuleDTO } from './dto/create-rule.dto';
import { UpdateRuleDTO } from './dto/update-rule.dto';
import { Rule } from './entities/rule.entity';

@Injectable()
export class RulesService {
  constructor(
    @InjectRepository(Rule)
    private ruleRepository: Repository<Rule>,
  ) {}

  async delete(userId: number, id: number) {
    const rule = await this.selectById(userId, id);

    await this.ruleRepository.remove(rule);
  }

  async duplicateNameCheck(userId: number, ruleName: string) {
    const existingRule = await this.ruleRepository.findOne({
      where: {
        name: ruleName,
        user: {
          id: userId,
        },
      },
    });

    if (existingRule) {
      throw new DuplicateRuleNameException('Rule name already exists');
    }
  }

  async create(userId: number, createRuleDTO: CreateRuleDTO) {
    // Name check
    await this.duplicateNameCheck(userId, createRuleDTO.name);

    const rule = this.ruleRepository.create(createRuleDTO);

    // TODO: S.G. This is ugly and should be fixed.
    const user = new User();
    user.id = userId;
    rule.user = user;

    return await this.ruleRepository.save(rule);
  }

  async update(userId: number, id: number, updateRuleDTO: UpdateRuleDTO) {
    if (updateRuleDTO.name) {
      await this.duplicateNameCheck(userId, updateRuleDTO.name);
    }

    const rule = await this.selectById(userId, id);
    return await this.ruleRepository.save({
      ...rule,
      ...updateRuleDTO,
    });
  }

  async selectById(userId: number, id: number) {
    const rule = await this.ruleRepository.findOne({
      where: {
        id: id,
        user: {
          id: userId,
        },
      },
    });

    if (!rule) {
      throw new NotFoundException();
    }

    return rule;
  }

  async selectAllByUserId(userId: number) {
    return await this.ruleRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }
}

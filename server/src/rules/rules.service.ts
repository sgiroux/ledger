import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async delete(user: User, id: number) {
    const rule = await this.selectById(user, id);

    await this.ruleRepository.remove(rule);
  }

  async create(user: User, createRuleDTO: CreateRuleDTO) {
    // Name check
    const existingRule = await this.ruleRepository.findOne({
      where: {
        name: createRuleDTO.name,
        user: {
          id: user.id,
        },
      },
    });

    if (existingRule) {
      throw new BadRequestException('Rule name already exists');
    }

    const rule = this.ruleRepository.create(createRuleDTO);
    rule.user = user;

    return await this.ruleRepository.save(rule);
  }

  async update(user: User, id: number, updateRuleDTO: UpdateRuleDTO) {
    const rule = await this.selectById(user, id);
    return await this.ruleRepository.save({
      ...rule,
      ...updateRuleDTO,
    });
  }

  async selectById(user: User, id: number) {
    const rule = await this.ruleRepository.findOne({
      where: {
        id: id,
        user: {
          id: user.id,
        },
      },
    });

    if (!rule) {
      throw new NotFoundException();
    }

    return rule;
  }

  async selectAllByUser(user: User) {
    return await this.ruleRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }
}

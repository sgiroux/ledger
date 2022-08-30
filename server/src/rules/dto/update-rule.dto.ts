import { PartialType } from '@nestjs/swagger';
import { CreateRuleDTO } from './create-rule.dto';

export class UpdateRuleDTO extends PartialType(CreateRuleDTO) {}

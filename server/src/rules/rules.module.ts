import { Module } from '@nestjs/common';
import { RulesService } from './rules.service';
import { RulesController } from './rules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rule } from './entities/rule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rule])],
  controllers: [RulesController],
  providers: [RulesService],
  exports: [RulesService],
})
export class RulesModule {}

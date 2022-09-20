import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { RulesService } from './rules.service';
import { CreateRuleDTO } from './dto/create-rule.dto';
import { UpdateRuleDTO } from './dto/update-rule.dto';
import { APIRequest } from '../types';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { Rule } from './entities/rule.entity';

@Controller('rules')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class RulesController {
  constructor(private readonly rulesService: RulesService) {}

  @ApiOkResponse({ type: Rule, isArray: true })
  @Get()
  async selectAll(@Req() request: APIRequest) {
    return await this.rulesService.selectAllByUserId(request.user.id);
  }

  @ApiOkResponse({ type: Rule })
  @Get(':id')
  async selectById(
    @Req() request: APIRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.rulesService.selectById(request.user.id, id);
  }

  @ApiOkResponse({ type: Rule })
  @Patch(':id')
  async update(
    @Req() request: APIRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRuleDTO: UpdateRuleDTO,
  ) {
    return await this.rulesService.update(request.user.id, id, updateRuleDTO);
  }

  @ApiOkResponse({ type: Rule })
  @Post()
  async create(
    @Req() request: APIRequest,
    @Body() createRuleDTO: CreateRuleDTO,
  ) {
    return await this.rulesService.create(request.user.id, createRuleDTO);
  }

  @ApiOkResponse()
  @Delete(':id')
  async delete(
    @Req() request: APIRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.rulesService.delete(request.user.id, id);
  }
}

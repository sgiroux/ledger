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
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('rules')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class RulesController {
  constructor(private readonly rulesService: RulesService) {}

  @Get()
  async selectAll(@Req() request: APIRequest) {
    return await this.rulesService.selectAllByUser(request.user);
  }

  @Get(':id')
  async selectById(
    @Req() request: APIRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.rulesService.selectById(request.user, id);
  }

  @Patch(':id')
  async update(
    @Req() request: APIRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRuleDTO: UpdateRuleDTO,
  ) {
    return await this.rulesService.update(request.user, id, updateRuleDTO);
  }

  @Post()
  async create(
    @Req() request: APIRequest,
    @Body() createRuleDTO: CreateRuleDTO,
  ) {
    return await this.rulesService.create(request.user, createRuleDTO);
  }

  @Delete(':id')
  async delete(
    @Req() request: APIRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.rulesService.delete(request.user, id);
  }
}

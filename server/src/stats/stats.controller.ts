import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { APIRequest } from '../types';
import { StatsService } from './stats.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('stats')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('summary')
  async summary(@Req() request: APIRequest) {
    return await this.statsService.getSummaryStats(request.user);

    //return instanceToPlain(SummaryStatsDTO, {});
  }
}

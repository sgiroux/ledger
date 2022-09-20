import {
  Controller,
  DefaultValuePipe,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { APIRequest } from '../types';
import { StatsService } from './stats.service';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SummaryDateRange } from './dto/summary-stats.dto';

@Controller('stats')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @ApiQuery({ name: 'dateRange', enum: SummaryDateRange })
  @Get('summary')
  async summary(
    @Req() request: APIRequest,
    @Query('dateRange', new DefaultValuePipe(SummaryDateRange.LAST_7_DAYS))
    dateRange: SummaryDateRange,
  ) {
    return await this.statsService.getSummaryStats(request.user, dateRange);
  }
}

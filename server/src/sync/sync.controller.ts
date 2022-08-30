import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { APIRequest } from '../types';
import { SyncService } from './sync.service';

@Controller('sync')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post('start')
  async start(@Req() request: APIRequest) {
    //Start the sync job.  Should return a job id?
    await this.syncService.startSync(request.user);
  }

  @Get('status')
  async status(@Req() request: APIRequest) {
    const syncStatus = await this.syncService.getStatus(request.user);
    return syncStatus;
  }
}

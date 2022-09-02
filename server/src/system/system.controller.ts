import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { SystemService } from './system.service';

@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get('status')
  async status() {
    return await this.systemService.getStatus();
  }

  @Post('initialize')
  async initialize(@Body() createUserDTO: CreateUserDTO) {
    return await this.systemService.initialize(createUserDTO);
  }
}

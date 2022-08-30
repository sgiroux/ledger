import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
//@ApiBearerAuth()
//@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('syncTransactions')
  async syncTransactions() {
    this.tasksService.syncTransactions();
  }
}

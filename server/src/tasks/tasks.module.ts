import { Module } from '@nestjs/common';
import { SyncModule } from '../sync/sync.module';
import { UsersModule } from '../users/users.module';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [SyncModule, UsersModule],
})
export class TasksModule {}

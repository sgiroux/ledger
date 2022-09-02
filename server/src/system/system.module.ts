import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemController } from './system.controller';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [SystemController],
  providers: [SystemService],
  imports: [UsersModule, AuthModule],
})
export class SystemModule {}

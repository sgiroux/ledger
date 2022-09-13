import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SyncStatusDTO {
  constructor(status: 'RUNNING' | 'NOT_RUNNING', percentComplete: number) {
    this.status = status;
    this.percentComplete = percentComplete;
  }

  @ApiProperty({ enum: ['RUNNING', 'NOT_RUNNING'] })
  @IsNotEmpty()
  @IsString()
  status: 'RUNNING' | 'NOT_RUNNING';

  @IsPositive()
  @IsInt()
  percentComplete: number;
}

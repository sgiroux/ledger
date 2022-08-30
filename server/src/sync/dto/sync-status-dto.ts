import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SyncStatusDTO {
  constructor(status: 'RUNNING' | 'NOT_RUNNING', percentComplete: number) {
    this.status = status;
    this.percentComplete = percentComplete;
  }

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: 'RUNNING' | 'NOT_RUNNING';

  @ApiProperty()
  @IsPositive()
  @IsInt()
  percentComplete: number;
}

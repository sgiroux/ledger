import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class SystemStatusDTO {
  @ApiProperty()
  @IsBoolean()
  isInitialized: boolean;
}

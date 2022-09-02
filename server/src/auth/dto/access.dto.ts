import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AccessDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}

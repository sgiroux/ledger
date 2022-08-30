import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ExchangeTokenDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  publicToken: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateRuleDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  criteria: string;

  @IsNotEmpty()
  @IsBoolean()
  isEnabled: boolean;

  @ApiProperty({
    enum: ['name', 'transactionId', 'paymentChannel'],
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(['name', 'transactionId', 'paymentChannel'])
  field: 'name' | 'transactionId' | 'paymentChannel';

  @ApiProperty({
    enum: ['contains', 'equals'],
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(['contains', 'equals'])
  operation: 'contains' | 'equals';
}

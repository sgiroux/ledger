import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsObject,
} from 'class-validator';
import { PlaidTransaction } from '../../plaid-transactions/entities/plaid-transaction.entity';
import { DailyDataPointsDTO } from './daily-data-point.dto';

export class SummaryStatsDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  numRules: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  numAccounts: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalSpend: number;

  @ApiProperty()
  @IsDateString()
  costliestDate?: string;

  @ApiProperty()
  @IsObject()
  largestTransaction?: PlaidTransaction;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  transactions: PlaidTransaction[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  dailyDataPoints: DailyDataPointsDTO[];
}

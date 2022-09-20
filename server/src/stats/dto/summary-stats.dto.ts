import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
} from 'class-validator';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { DailyDataPointsDTO } from './daily-data-point.dto';

export enum SummaryDateRange {
  LAST_7_DAYS = 'LAST_7_DAYS',
  LAST_14_DAYS = 'LAST_14_DAYS',
  LAST_30_DAYS = 'LAST_30_DAYS',
  LAST_60_DAYS = 'LAST_60_DAYS',
  LAST_90_DAYS = 'LAST_90_DAYS',
}

export class SummaryStatsDTO {
  @ApiProperty({
    enum: SummaryDateRange,
  })
  @IsNotEmpty()
  @IsEnum(SummaryDateRange)
  dateRange: SummaryDateRange;

  @IsNotEmpty()
  @IsNumber()
  numRules: number;

  @IsNotEmpty()
  @IsNumber()
  numAccounts: number;

  @IsNotEmpty()
  @IsNumber()
  totalSpend: number;

  @IsDateString()
  costliestDate?: string;

  @IsObject()
  largestTransaction?: Transaction;

  @IsNotEmpty()
  @IsArray()
  transactions: Transaction[];

  @IsNotEmpty()
  @IsArray()
  dailyDataPoints: DailyDataPointsDTO[];
}

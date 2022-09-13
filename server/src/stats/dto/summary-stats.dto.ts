import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsObject,
} from 'class-validator';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { DailyDataPointsDTO } from './daily-data-point.dto';

export class SummaryStatsDTO {
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

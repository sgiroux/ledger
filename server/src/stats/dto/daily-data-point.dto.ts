import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DailyDataPointsDTO {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;
}

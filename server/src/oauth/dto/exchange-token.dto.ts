import { IsNotEmpty, IsString } from 'class-validator';

export class ExchangeTokenDTO {
  @IsNotEmpty()
  @IsString()
  publicToken: string;
}

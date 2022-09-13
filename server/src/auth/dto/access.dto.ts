import { IsNotEmpty, IsString } from 'class-validator';

export class AccessDTO {
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}

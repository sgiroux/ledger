import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDTO {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class LinkTokenDTO {
  @IsNotEmpty()
  @IsString()
  token: string;
}

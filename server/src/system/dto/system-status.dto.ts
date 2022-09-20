import { IsBoolean, IsNotEmpty } from 'class-validator';

export class SystemStatusDTO {
  @IsBoolean()
  @IsNotEmpty()
  isInitialized: boolean;
}

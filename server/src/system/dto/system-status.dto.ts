import { IsBoolean } from 'class-validator';

export class SystemStatusDTO {
  @IsBoolean()
  isInitialized: boolean;
}

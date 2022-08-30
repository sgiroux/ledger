import { plainToInstance } from 'class-transformer';
import { IsString, IsNotEmpty, IsEnum, validateSync } from 'class-validator';

enum PlaidEnvironment {
  SANDBOX = 'sandbox',
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

class EnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  PLAID_CLIENT_ID: string;

  @IsString()
  @IsNotEmpty()
  PLAID_SECRET: string;

  @IsEnum(PlaidEnvironment)
  PLAID_ENVIRONMENT: PlaidEnvironment;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;
}

export class ConfigurationUtil {
  static validateConfig(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
    return validatedConfig;
  }
}

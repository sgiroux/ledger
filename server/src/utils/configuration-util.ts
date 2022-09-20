export enum EnvironmentVariable {
  PLAID_ENVIRONMENT = 'PLAID_ENVIRONMENT',
  PLAID_CLIENT_ID = 'PLAID_CLIENT_ID',
  PLAID_SECRET = 'PLAID_SECRET',
  JWT_SECRET = 'JWT_SECRET',
}

export const validateEnvironmentVariables = async () => {
  if (!process.env.PLAID_ENVIRONMENT) {
    throw new Error(`Missing Environment Variables: PLAID_ENVIRONMENT`);
  }

  if (!process.env.PLAID_CLIENT_ID) {
    throw new Error(`Missing Environment Variables: PLAID_CLIENT_ID`);
  }

  if (!process.env.PLAID_SECRET) {
    throw new Error(`Missing Environment Variables: PLAID_SECRET`);
  }

  if (!process.env.JWT_SECRET) {
    throw new Error(`Missing Environment Variables: JWT_SECRET`);
  }
};

export const getEnvironmentVariable = (
  variable: EnvironmentVariable,
  isTest = false,
) => {
  if (isTest) {
    return '';
  }

  return process.env[variable.toString()];
};

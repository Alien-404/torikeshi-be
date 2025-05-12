import { logger } from '@common/logger';

export const config = {
  // prep
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 8080,
  PASSWORD_ADMIN: process.env.PASSWORD_ADMIN as string,

  // jwt
  SECRET_KEY: process.env.SECRET_KEY as string,

  // DB
  DATABASE_URL: process.env.DATABASE_URL as string,
};

// validate config environment
const validateConfig = (config: any, path = '') => {
  Object.keys(config).forEach((key) => {
    const value = config[key];
    const fullPath = path ? `${path}.${key}` : key;

    if (value === null || value === undefined || value === '') {
      throw new Error(
        `Configuration error on ${fullPath} is missing or invalid.`
      );
    }

    // const longValues = [
    //   'APP_KEY',
    //   'SECRET_KEY_USER',
    //   'SECRET_KEY_ADMIN',
    //   'SECRET_KEY_REFRESH',
    // ];
    // if (longValues.includes(key) && value.length < 32) {
    //   throw new Error(`${fullPath} must be at least 32 characters long.`);
    // }

    // If the value is an object, recursively validate its properties
    if (typeof value === 'object' && !Array.isArray(value)) {
      validateConfig(value, fullPath);
    }
  });
};

try {
  validateConfig(config);
  logger.info(`Configuration validated successfully.`);
} catch (error: any) {
  logger.error(`${error.message}`);
  process.exit(1);
}

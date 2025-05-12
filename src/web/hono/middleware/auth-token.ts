import type { Context, Next } from 'hono';
import { jwt } from 'hono/jwt';
import { ExceptionError } from './error-logger';
import { createCustomError } from '@common/contracts/response';
import { getErrorMessage } from '@common/utils/verify-jwt';
import { config } from '@config/index';

export const protect = async (c: Context, next: Next) => {
  try {
    const authorizationHeader = c.req.header('Authorization');
    c.set('bearer_token', authorizationHeader?.split(' ')[1]);

    await jwt({ secret: config.SECRET_KEY })(c, next);
  } catch (error) {
    const message = getErrorMessage(error);
    throw ExceptionError(createCustomError(message, 401));
  }
};

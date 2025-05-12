import type { Context } from 'hono';
import type { StatusCode } from 'hono/utils/http-status';
import {
  createErrorResponse,
  createFailResponse,
} from '@common/contracts/response';
import type { CustomError } from '@common/contracts/type';

// error 500 handler
export const errorHandler = async (c: Context, err: Error) => {
  const error = err as CustomError;
  const statusCode = error.status as StatusCode;
  const data = await c.req.raw.json().catch(() => ({}));
  const userAgent = c.req.header('User-Agent');

  const response = createErrorResponse(
    c.get('requestId'),
    error.cause?.message as string
  );

  return c.json(response, statusCode || 500);
};

// error not found
export const notFoundHandler = (c: Context) => {
  const response = createFailResponse(
    `Not Found - [${c.req.method}] ${c.req.url}`
  );
  return c.json(response, 404);
};

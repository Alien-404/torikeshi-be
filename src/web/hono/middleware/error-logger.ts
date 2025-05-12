import type { StatusCode } from 'hono/utils/http-status';
import { HTTPException } from 'hono/http-exception';
import type { CustomError } from '@common/contracts/type';

export const ExceptionError = (error: CustomError) => {
  const statusCode = error.status || 500;

  throw new HTTPException(statusCode as StatusCode, {
    cause: error,
    message: 'Internal server error!',
  });
};

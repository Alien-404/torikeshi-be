import { createSuccessResponse } from '@common/contracts/response';
import type { CustomError } from '@common/contracts/type';
import { ExceptionError } from '@web/hono/middleware/error-logger';
import type { Context } from 'hono';
import { authRepository } from './repository';

export default {
  login: async (c: Context) => {
    try {
      const data = await c.req.json();
      const res = await authRepository.login(data);

      return c.json(createSuccessResponse(res));
    } catch (err) {
      ExceptionError(err as CustomError);
    }
  },
};

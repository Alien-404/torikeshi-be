import { createSuccessResponse } from '@common/contracts/response';
import type { CustomError } from '@common/contracts/type';
import { ExceptionError } from '@web/hono/middleware/error-logger';
import type { Context } from 'hono';
import { orderRepository } from './repository';

export default {
  index: async (c: Context) => {
    try {
      const res = await orderRepository.index();

      return c.json(createSuccessResponse(res));
    } catch (err) {
      ExceptionError(err as CustomError);
    }
  },
  show: async (c: Context) => {
    try {
      const id = c.req.param('id');
      const res = await orderRepository.show(id);

      return c.json(createSuccessResponse(res));
    } catch (err) {
      ExceptionError(err as CustomError);
    }
  },
  delete: async (c: Context) => {
    try {
      const id = c.req.param('id');
      const res = await orderRepository.delete(id);

      return c.json(createSuccessResponse(res));
    } catch (err) {
      ExceptionError(err as CustomError);
    }
  },
  update: async (c: Context) => {
    try {
      const id = c.req.param('id');
      const data = await c.req.json();
      const res = await orderRepository.update(data, id);

      return c.json(createSuccessResponse(res));
    } catch (err) {
      ExceptionError(err as CustomError);
    }
  },
  create: async (c: Context) => {
    try {
      const user = c.get('jwtPayload');
      const data = await c.req.json();
      const res = await orderRepository.create(data, user);

      return c.json(createSuccessResponse(res));
    } catch (err) {
      ExceptionError(err as CustomError);
    }
  },
};

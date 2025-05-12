import { createFailResponse } from '@common/contracts/response';
import { rateLimiter } from 'hono-rate-limiter';

export const limiter = (limit: number = 500, time: number = 1 * 60 * 1000) =>
  rateLimiter({
    windowMs: time,
    limit: limit,
    standardHeaders: 'draft-6',
    keyGenerator: (c) => 'b679da09cda2',
    message: createFailResponse(
      'to many request from this IP, try again later.'
    ) as unknown as string,
  });

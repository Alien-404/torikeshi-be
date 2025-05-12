import type { Hono } from 'hono';
import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json';
import { logger } from 'hono/logger';
import { requestId } from 'hono/request-id';
import { limiter } from '@common/limitter';
import router from '@core/router';

export const honoConfig = (app: Hono) => {
  // security middleware
  app.use(
    '*',
    requestId(),
    logger(),
    limiter(1000),
    prettyJSON(),
    cors({
      origin: [
        '*',
        'http://localhost:3000',
        'http://localhost:8080',
        'http://localhost:8000',
        'https://torikeshi.rinaru.com',
      ],
    })
  );

  // register route
  app.get('/', (c) => c.text(`TORIKESHI API - ${c.get('requestId')}`));

  // route
  app.route('/v1', router);
};

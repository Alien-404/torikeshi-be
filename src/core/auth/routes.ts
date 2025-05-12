// packages
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import authController from './controller';
import { loginSchema } from './validation';

const auth = new Hono();

// routes
auth.post('/login', zValidator('json', loginSchema), async (c) =>
  authController.login(c)
);

export default auth;

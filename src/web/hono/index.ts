import { Hono } from 'hono';
import { honoConfig } from '@web/hono/hono-app';
import {
  errorHandler,
  notFoundHandler,
} from '@web/hono/middleware/error-handler';

// Create Hono app
const app = new Hono();

// middleware config hono
honoConfig(app);

// not found
app.notFound((c) => {
  const error = notFoundHandler(c);
  return error;
});

// error
app.onError((err, c) => {
  const error = errorHandler(c, err);
  return error;
});

export default app;

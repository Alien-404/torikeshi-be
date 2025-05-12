// packages
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import orderController from './controller';
import { OrdersSchemaReq, updateOrderSchema } from './validation';
import { protect } from '@web/hono/middleware/auth-token';

const router = new Hono();

router.use(protect);

// routes
router.get('/canceled-orders', async (c) => orderController.index(c));
router.get('/canceled-orders/:id', async (c) => orderController.show(c));
router.delete('/canceled-orders/:id', async (c) => orderController.delete(c));
router.put(
  '/canceled-orders/:id',
  zValidator('json', updateOrderSchema),
  async (c) => orderController.update(c)
);

router.post(
  '/canceled-orders',
  zValidator('json', OrdersSchemaReq),
  async (c) => orderController.create(c)
);

export default router;

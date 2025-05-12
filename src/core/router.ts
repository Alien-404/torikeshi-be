// packages
import { Hono } from 'hono';
const router = new Hono();

// route
import authRoutes from '@core/auth/routes';
import orderRoutes from '@core/orders/routes';

// endpoint
router.route('/auth', authRoutes);
router.route('/orders', orderRoutes);

export default router;

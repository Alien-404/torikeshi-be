import { Prisma, PrismaClient, type Order } from '@prisma/client';
import {
  deleteOrder,
  getAllOrderByOrderId,
  getAllOrders,
  getDetailOrder,
  updateOrder,
} from './service';
import type { OrdersIndexResponse } from './types';
import { createCustomError } from '@common/contracts/response';
import type { orderCreateTypeReq, orderUpdateTypeReq } from './validation';
import { logger } from '@common/logger';
import { findUserByUsername } from '@core/auth/service';

const prisma = new PrismaClient();

const createOrderRepo = () => {
  return {
    index: async (): Promise<OrdersIndexResponse> => {
      const orders = (await getAllOrders()) ?? [];
      return {
        orders,
      };
    },

    show: async (id: string): Promise<Order | null> => {
      const order = await getDetailOrder(id);
      if (!order) throw createCustomError('not found', 404);

      return order;
    },

    delete: async (id: string): Promise<Order> => {
      const order = await getDetailOrder(id);
      if (!order) throw createCustomError('not found', 404);

      // delete
      await deleteOrder(order.id);

      return order;
    },

    update: async (req: orderUpdateTypeReq, id: string): Promise<Order> => {
      const order = await getDetailOrder(id);
      if (!order) throw createCustomError('not found', 404);

      // check
      //   if (!req.note && !req.status)
      //     throw createCustomError('cannot null status and notes', 400);

      // update
      await updateOrder(
        order.id,
        req.note ?? '',
        req.status ? req.status : order.currentStatus
      );

      return order;
    },

    create: async (req: orderCreateTypeReq, user: any): Promise<null> => {
      const isUser = await findUserByUsername(user.username as string);
      if (!isUser) throw createCustomError(`not found: ${user.username}`, 404);

      const inputOrderIds = req.data.map((order) => order.orderId);

      const existingOrders = (await getAllOrderByOrderId(inputOrderIds)) ?? [];
      const existingOrderIds = new Set(
        existingOrders.map((order) => order.orderId)
      );

      const newOrders = req.data.filter(
        (order) => !existingOrderIds.has(order.orderId)
      );

      const preparedOrders: Prisma.OrderCreateManyInput[] = newOrders.map(
        (order) => ({
          ...order,
          note: '',
          userId: isUser.id,
        })
      );

      if (preparedOrders.length > 0) {
        await prisma.order.createMany({
          data: preparedOrders,
          skipDuplicates: true,
        });
      }

      logger.info(
        JSON.stringify({
          inserted: preparedOrders.length,
          skipped: req.data.length - preparedOrders.length,
        })
      );

      return null;
    },
  };
};

export const orderRepository = createOrderRepo();

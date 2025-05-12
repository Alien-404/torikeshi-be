import { Prisma, PrismaClient, Status, type Order } from '@prisma/client';
import type { OrdersIndex, OrdersIndexIds } from './types';
import type { orderUpdateTypeReq } from './validation';
const prisma = new PrismaClient();

export const getAllOrders = async (): Promise<OrdersIndex[] | null> => {
  const response = await prisma.order.findMany({
    select: {
      id: true,
      orderId: true,
      productName: true,
      buyerUsername: true,
      cancelReason: true,
      cancelledTime: true,
      currentStatus: true,
      note: true,
      orderAmount: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return response;
};

export const getDetailOrder = async (id: string): Promise<Order | null> => {
  const response = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  return response;
};

export const deleteOrder = async (id: string): Promise<Order> => {
  const response = await prisma.order.delete({
    where: {
      id: id,
    },
  });
  return response;
};

export const updateOrder = async (
  id: string,
  note: string,
  currentStatus: Status
): Promise<Order> => {
  const response = await prisma.order.update({
    where: {
      id,
    },
    data: {
      note: note,
      currentStatus: currentStatus,
    },
  });
  return response;
};

export const getAllOrderByOrderId = async (
  orderIds: string[]
): Promise<OrdersIndexIds[] | null> => {
  const response = await prisma.order.findMany({
    where: {
      orderId: {
        in: orderIds,
      },
    },
    select: {
      orderId: true,
    },
  });

  return response;
};

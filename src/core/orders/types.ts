import type { Prisma } from '@prisma/client';

export type OrdersIndex = Prisma.OrderGetPayload<{
  select: {
    id: true;
    orderId: true;
    productName: true;
    buyerUsername: true;
    cancelReason: true;
    cancelledTime: true;
    currentStatus: true;
    note: true;
    orderAmount: true;
    createdAt: true;
    updatedAt: true;
  };
}>;

export type OrdersIndexIds = Prisma.OrderGetPayload<{
  select: {
    orderId: true;
  };
}>;

export type OrdersIndexResponse = {
  orders: OrdersIndex[];
};

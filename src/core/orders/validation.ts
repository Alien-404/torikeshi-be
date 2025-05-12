import { z } from 'zod';

export const updateOrderSchema = z
  .object({
    note: z.string().optional().nullable(),
    status: z
      .enum(['canceled', 'claimed', 'processing', 'pending', 'resolved'])
      .optional()
      .nullable(),
  })
  .strict();

export const OrderSchema = z
  .object({
    orderId: z.string(),
    orderStatus: z.string(),
    orderSubstatus: z.string(),
    cancelationReturnType: z.string(),
    normalOrPreOrder: z.string(),
    skuId: z.string(),
    sellerSku: z.string().nullable().optional(),
    productName: z.string(),
    variation: z.string(),
    quantity: z.number().int(),
    skuQuantityOfReturn: z.number().int(),
    skuUnitOriginalPrice: z.number().int(),
    skuSubtotalBeforeDiscount: z.number().int(),
    skuPlatformDiscount: z.number().int(),
    skuSellerDiscount: z.number().int(),
    skuSubtotalAfterDiscount: z.number().int(),
    shippingFeeAfterDiscount: z.number().int(),
    originalShippingFee: z.number().int(),
    shippingFeeSellerDiscount: z.number().int(),
    shippingFeePlatformDiscount: z.number().int(),
    paymentPlatformDiscount: z.number().int(),
    buyerServiceFee: z.number().int(),
    handlingFee: z.number().int(),
    shippingInsurance: z.number().int(),
    itemInsurance: z.number().int(),
    orderAmount: z.number().int(),
    orderRefundAmount: z.number().int(),
    createdTime: z.string().datetime().nullable().optional(),
    paidTime: z.string().datetime().nullable().optional(),
    rtsTime: z.string().datetime().nullable().optional(),
    shippedTime: z.string().datetime().nullable().optional(),
    deliveredTime: z.string().datetime().nullable().optional(),
    cancelledTime: z.string().datetime().nullable().optional(),
    cancelBy: z.string().nullable().optional(),
    cancelReason: z.string().nullable().optional(),
    fulfillmentType: z.string(),
    warehouseName: z.string(),
    trackingId: z.string(),
    deliveryOption: z.string(),
    shippingProviderName: z.string(),
    buyerMessage: z.string().nullable().optional(),
    buyerUsername: z.string(),
    recipient: z.string(),
    phone: z.string(),
    zipcode: z.string().nullable().optional(),
    country: z.string(),
    province: z.string(),
    regencyAndCity: z.string(),
    districts: z.string(),
    villages: z.string(),
    detailAddress: z.string(),
    additionalAddressInformation: z.string().nullable().optional(),
    paymentMethod: z.string(),
    weight: z.number(),
    productCategory: z.string(),
    packageId: z.string(),
    purchaseChannel: z.string(),
    sellerNote: z.string().nullable().optional(),
    checkedStatus: z.string(),
    checkedMarkedBy: z.string().nullable().optional(),
    tokopediaInvoiceNumber: z.string().nullable().optional(),
  })
  .strict();

export const OrdersSchemaReq = z
  .object({
    data: z.array(OrderSchema),
  })
  .strict();

export type orderUpdateTypeReq = z.infer<typeof updateOrderSchema>;
export type orderCreateTypeReq = z.infer<typeof OrdersSchemaReq>;

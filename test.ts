import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
function generateRandomOrderId(): string {
  const min = 10n ** 17n; // 100000000000000000
  const max = 10n ** 18n - 1n; // 999999999999999999
  const randomBigInt =
    min + BigInt(Math.floor(Math.random() * Number(max - min + 1n)));
  return randomBigInt.toString();
}

async function main() {
  const userId = 'cm5yx0jsa01010ci94i3g5rwh';

  for (let i = 1; i <= 10; i++) {
    await prisma.order.create({
      data: {
        orderId: generateRandomOrderId(),
        orderStatus: 'Canceled',
        orderSubstatus: 'Canceled',
        cancelationReturnType: 'Cancel',
        normalOrPreOrder: 'Normal',
        skuId: `SKU-${i}`,
        sellerSku: `SELLER-SKU-${i}`,
        productName: `Produk Contoh ${i}`,
        variation: i % 2 === 0 ? 'Merah' : 'Biru',
        quantity: 1,
        skuQuantityOfReturn: 1,
        skuUnitOriginalPrice: 200000,
        skuSubtotalBeforeDiscount: 200000,
        skuPlatformDiscount: 5000,
        skuSellerDiscount: 10000,
        skuSubtotalAfterDiscount: 185000,
        shippingFeeAfterDiscount: 0,
        originalShippingFee: 20000,
        shippingFeeSellerDiscount: 0,
        shippingFeePlatformDiscount: 20000,
        paymentPlatformDiscount: 0,
        buyerServiceFee: 1000,
        handlingFee: 1500,
        shippingInsurance: 0,
        itemInsurance: 0,
        orderAmount: 187500,
        orderRefundAmount: 185000,
        createdTime: new Date(),
        paidTime: null,
        rtsTime: null,
        shippedTime: new Date(),
        deliveredTime: new Date(),
        cancelledTime: new Date(),
        cancelBy: 'System',
        cancelReason: 'Delivery failed',
        fulfillmentType: 'Fulfillment by seller',
        warehouseName: 'Gudang Pusat',
        trackingId: `TRACKID-${i}`,
        deliveryOption: 'Pengiriman Standar',
        shippingProviderName: 'J&T Express',
        buyerMessage: '',
        buyerUsername: `user${i}`,
        recipient: `Penerima ${i}`,
        phone: `08${Math.floor(100000000 + Math.random() * 900000000)}`,
        zipcode: '12345',
        country: 'Indonesia',
        province: 'Jawa Barat',
        regencyAndCity: 'Bandung',
        districts: 'Coblong',
        villages: 'Dago',
        detailAddress: `Jl. Contoh No. ${i}`,
        additionalAddressInformation: '',
        paymentMethod: 'COD',
        weight: 0.5,
        productCategory: 'Pakaian',
        packageId: `PKG-${i}`,
        purchaseChannel: 'TikTok',
        sellerNote: '',
        checkedStatus: 'Unchecked',
        checkedMarkedBy: null,
        tokopediaInvoiceNumber: null,
        currentStatus: 'canceled',
        note: '',
        userId,
      },
    });
  }

  console.log('✅ 10 order data berhasil ditambahkan');
}

main()
  .catch((e) => {
    console.error('❌ Gagal:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
``;

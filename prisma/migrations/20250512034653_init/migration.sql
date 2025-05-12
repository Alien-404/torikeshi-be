-- CreateEnum
CREATE TYPE "Status" AS ENUM ('canceled', 'claimed', 'processing', 'pending', 'resolved');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "orderStatus" TEXT NOT NULL,
    "orderSubstatus" TEXT NOT NULL,
    "cancelationReturnType" TEXT NOT NULL,
    "normalOrPreOrder" TEXT NOT NULL,
    "skuId" TEXT NOT NULL,
    "sellerSku" TEXT,
    "productName" TEXT NOT NULL,
    "variation" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "skuQuantityOfReturn" INTEGER NOT NULL,
    "skuUnitOriginalPrice" INTEGER NOT NULL,
    "skuSubtotalBeforeDiscount" INTEGER NOT NULL,
    "skuPlatformDiscount" INTEGER NOT NULL,
    "skuSellerDiscount" INTEGER NOT NULL,
    "skuSubtotalAfterDiscount" INTEGER NOT NULL,
    "shippingFeeAfterDiscount" INTEGER NOT NULL,
    "originalShippingFee" INTEGER NOT NULL,
    "shippingFeeSellerDiscount" INTEGER NOT NULL,
    "shippingFeePlatformDiscount" INTEGER NOT NULL,
    "paymentPlatformDiscount" INTEGER NOT NULL,
    "buyerServiceFee" INTEGER NOT NULL,
    "handlingFee" INTEGER NOT NULL,
    "shippingInsurance" INTEGER NOT NULL,
    "itemInsurance" INTEGER NOT NULL,
    "orderAmount" INTEGER NOT NULL,
    "orderRefundAmount" INTEGER NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL,
    "paidTime" TIMESTAMP(3),
    "rtsTime" TIMESTAMP(3),
    "shippedTime" TIMESTAMP(3),
    "deliveredTime" TIMESTAMP(3),
    "cancelledTime" TIMESTAMP(3),
    "cancelBy" TEXT,
    "cancelReason" TEXT,
    "fulfillmentType" TEXT NOT NULL,
    "warehouseName" TEXT NOT NULL,
    "trackingId" TEXT NOT NULL,
    "deliveryOption" TEXT NOT NULL,
    "shippingProviderName" TEXT NOT NULL,
    "buyerMessage" TEXT,
    "buyerUsername" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "zipcode" TEXT,
    "country" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "regencyAndCity" TEXT NOT NULL,
    "districts" TEXT NOT NULL,
    "villages" TEXT NOT NULL,
    "detailAddress" TEXT NOT NULL,
    "additionalAddressInformation" TEXT,
    "paymentMethod" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "productCategory" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "purchaseChannel" TEXT NOT NULL,
    "sellerNote" TEXT,
    "checkedStatus" TEXT NOT NULL,
    "checkedMarkedBy" TEXT,
    "tokopediaInvoiceNumber" TEXT,
    "currentStatus" "Status" NOT NULL DEFAULT 'canceled',
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

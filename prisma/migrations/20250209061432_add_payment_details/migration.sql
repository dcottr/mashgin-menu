/*
  Warnings:

  - Added the required column `paymentDetailsID` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` ADD COLUMN `paymentDetailsID` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `PaymentDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cardNumber` VARCHAR(191) NOT NULL,
    `expiryMonth` INTEGER NOT NULL,
    `expiryYear` INTEGER NOT NULL,
    `cvv` INTEGER NOT NULL,
    `nameOnCard` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `PaymentDetails_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_paymentDetailsID_fkey` FOREIGN KEY (`paymentDetailsID`) REFERENCES `PaymentDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE `installment_payments` ADD COLUMN `unpaid_bill_id` INTEGER NULL AFTER `payment_method_id`;

-- CreateTable
CREATE TABLE `unpaid_bills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenor` VARCHAR(45) NOT NULL,
    `amount_principal_bill` DOUBLE NULL DEFAULT 0,
    `amount_service_fee` DOUBLE NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `installment_payments` ADD CONSTRAINT `installment_payments_unpaid_bill_id_fkey` FOREIGN KEY (`unpaid_bill_id`) REFERENCES `unpaid_bills`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
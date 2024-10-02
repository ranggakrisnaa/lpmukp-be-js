-- AlterTable
ALTER TABLE `installment_payments` ADD COLUMN `payment_method_id` INTEGER NULL AFTER `id`;

-- CreateTable
CREATE TABLE `payment_methods` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `payment_method_id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(45) NOT NULL,
    `type` VARCHAR(45) NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `handling_cost` INTEGER NULL DEFAULT 0,
    `percentage_cost` DOUBLE NULL DEFAULT 0,
    `account_number` VARCHAR(45) NULL,
    `account_name` VARCHAR(45) NULL,
    `icon` VARCHAR(45) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `payment_methods_payment_method_id_key`(`payment_method_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `installment_payments` ADD CONSTRAINT `installment_payments_payment_method_id_fkey` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

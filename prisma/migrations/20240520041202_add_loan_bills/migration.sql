-- CreateTable
CREATE TABLE `loan_bills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `installment_id` INTEGER NOT NULL,
    `tenor` VARCHAR(45) NOT NULL,
    `bill_amount` DOUBLE NOT NULL DEFAULT 0,
    `principal_bill` DOUBLE NULL DEFAULT 0,
    `service_fee` DOUBLE NULL DEFAULT 0,
    `due_date` DATE NOT NULL,
    `bill_paid` DOUBLE NULL DEFAULT 0,
    `invoice_url` VARCHAR(255) NULL,
    `remain_principal_bill` DOUBLE NULL DEFAULT 0,
    `remain_service_fee` DOUBLE NULL DEFAULT 0,
    `status` VARCHAR(45) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `loan_bills` ADD CONSTRAINT `loan_bills_installment_id_fkey` FOREIGN KEY (`installment_id`) REFERENCES `installments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE `loan_bills` ADD COLUMN `uuid` VARCHAR(191) NULL AFTER `id`;

-- CreateIndex
CREATE UNIQUE INDEX `loan_bills_uuid_key` ON `loan_bills`(`uuid`);
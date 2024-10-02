-- CreateTable
CREATE TABLE `installment_payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bill_amount` DOUBLE NOT NULL DEFAULT 0,
    `principal_bill` DOUBLE NULL DEFAULT 0,
    `installment_payment_id` VARCHAR(191) NOT NULL,
    `service_fee` DOUBLE NULL DEFAULT 0,
    `transaction_code` VARCHAR(45) NOT NULL,
    `transaction_date` DATETIME(3) NOT NULL,
    `payment_amount` DOUBLE NOT NULL DEFAULT 0,
    `status` VARCHAR(45) NOT NULL,
    `invoice_url` VARCHAR(255) NULL,
    `remain_principal_bill` DOUBLE NULL DEFAULT 0,
    `remain_service_fee` DOUBLE NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `installment_payments_installment_payment_id_key`(`installment_payment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
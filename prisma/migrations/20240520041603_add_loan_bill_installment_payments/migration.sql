-- CreateTable
CREATE TABLE `loan_bill_installment_payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `loan_bill_id` INTEGER NULL,
    `installment_payment_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `loan_bill_installment_payments` ADD CONSTRAINT `loan_bill_installment_payments_loan_bill_id_fkey` FOREIGN KEY (`loan_bill_id`) REFERENCES `loan_bills`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `loan_bill_installment_payments` ADD CONSTRAINT `loan_bill_installment_payments_installment_payment_id_fkey` FOREIGN KEY (`installment_payment_id`) REFERENCES `installment_payments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

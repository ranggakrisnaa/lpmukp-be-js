-- DropIndex
DROP INDEX `installment_payments_installment_payment_id_key` ON `installment_payments`;

-- AlterTable
ALTER TABLE `applications` MODIFY `bank_id` INT NULL AFTER `installment_id`;

-- AlterTable
ALTER TABLE `installment_payments` DROP COLUMN `installment_payment_id`,
    ADD COLUMN `uuid` VARCHAR(191) NOT NULL AFTER `unpaid_bill_id`;

-- CreateIndex
CREATE UNIQUE INDEX `installment_payments_uuid_key` ON `installment_payments`(`uuid`);

-- DropForeignKey
ALTER TABLE `applications` DROP FOREIGN KEY `applications_bank_id_fkey`;

-- AlterTable
ALTER TABLE `applications` MODIFY `bank_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `installment_payments` MODIFY `uuid` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `applications` ADD CONSTRAINT `applications_bank_id_fkey` FOREIGN KEY (`bank_id`) REFERENCES `banks`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
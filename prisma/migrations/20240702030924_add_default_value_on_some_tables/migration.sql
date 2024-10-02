/*
  Warnings:

  - You are about to drop the column `cultivation_id` on the `cultivation_reports` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `cultivations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `cultivation_reports` DROP FOREIGN KEY `cultivation_reports_cultivation_id_fkey`;

-- AlterTable
ALTER TABLE `applications` MODIFY `estimasi_omset_per_bulan` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `estimasi_biaya_per_bulan` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `estimasi_laba_per_bulan` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `estimasi_biaya_rumah_tangga` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `banks` MODIFY `manual_cost` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `instant_cost` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `cultivation_reports` DROP COLUMN `cultivation_id`;

-- AlterTable
ALTER TABLE `cultivations` DROP COLUMN `status`,
    ADD COLUMN `cultivation_report_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `installment_payments` MODIFY `bill_amount` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `principal_bill` DOUBLE NULL DEFAULT 0,
    MODIFY `service_fee` DOUBLE NULL DEFAULT 0,
    MODIFY `remain_principal_bill` DOUBLE NULL DEFAULT 0,
    MODIFY `remain_service_fee` DOUBLE NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `loan_bills` MODIFY `bill_amount` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `principal_bill` DOUBLE NULL DEFAULT 0,
    MODIFY `service_fee` DOUBLE NULL DEFAULT 0,
    MODIFY `bill_paid` DOUBLE NULL DEFAULT 0,
    MODIFY `remain_principal_bill` DOUBLE NULL DEFAULT 0,
    MODIFY `remain_service_fee` DOUBLE NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `loan_interests` MODIFY `bunga_pinjaman` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `plafonds` MODIFY `plafond` DOUBLE NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX `cultivations_cultivation_report_id_fkey` ON `cultivations`(`cultivation_report_id`);

-- AddForeignKey
ALTER TABLE `cultivations` ADD CONSTRAINT `cultivations_cultivation_report_id_fkey` FOREIGN KEY (`cultivation_report_id`) REFERENCES `cultivation_reports`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

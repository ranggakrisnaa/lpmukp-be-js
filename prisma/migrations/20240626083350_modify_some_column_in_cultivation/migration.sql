-- DropForeignKey
ALTER TABLE `seed_spreads` DROP FOREIGN KEY `seed_spreads_cultivation_report_id_fkey`;

-- AlterTable
ALTER TABLE `cultivations` ADD COLUMN `cultivation_report_id` INTEGER NULL AFTER `id`;

-- AlterTable
ALTER TABLE `seed_spreads` DROP COLUMN `cultivation_report_id`,
    ADD COLUMN `cultivationReportId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `cultivations` ADD CONSTRAINT `cultivations_cultivation_report_id_fkey` FOREIGN KEY (`cultivation_report_id`) REFERENCES `cultivation_reports`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `seed_spreads` ADD CONSTRAINT `seed_spreads_cultivationReportId_fkey` FOREIGN KEY (`cultivationReportId`) REFERENCES `cultivation_reports`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;


-- DropForeignKey
ALTER TABLE `cultivations` DROP FOREIGN KEY `cultivations_seed_spread_id_fkey`;

-- AlterTable
ALTER TABLE `cultivations` DROP COLUMN `seed_spread_id`;

-- AlterTable
ALTER TABLE `seed_spreads` ADD COLUMN `cultivation_id` INTEGER NULL AFTER `id`;

-- CreateIndex
CREATE UNIQUE INDEX `seed_spreads_cultivation_id_key` ON `seed_spreads`(`cultivation_id`);

-- AddForeignKey
ALTER TABLE `seed_spreads` ADD CONSTRAINT `seed_spreads_cultivation_id_fkey` FOREIGN KEY (`cultivation_id`) REFERENCES `cultivations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE `cultivations` DROP FOREIGN KEY `cultivations_cultivation_result_id_fkey`;

-- AlterTable
ALTER TABLE `cultivations` MODIFY `cultivation_result_id` INTEGER NULL AFTER `id`;

-- AddForeignKey
ALTER TABLE `cultivations` ADD CONSTRAINT `cultivations_cultivation_result_id_fkey` FOREIGN KEY (`cultivation_result_id`) REFERENCES `cultivation_results`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE `seed_spreads` DROP FOREIGN KEY `seed_spreads_cultivationReportId_fkey`;

-- AlterTable
ALTER TABLE `seed_spreads` DROP COLUMN `cultivationReportId`;

-- AlterTable
ALTER TABLE `applications` ALTER COLUMN `estimasi_omset_per_bulan` DROP DEFAULT,
    ALTER COLUMN `estimasi_biaya_per_bulan` DROP DEFAULT,
    ALTER COLUMN `estimasi_laba_per_bulan` DROP DEFAULT,
    ALTER COLUMN `estimasi_biaya_rumah_tangga` DROP DEFAULT;

-- AlterTable
ALTER TABLE `banks` ALTER COLUMN `manual_cost` DROP DEFAULT,
    ALTER COLUMN `instant_cost` DROP DEFAULT;

-- AlterTable
ALTER TABLE `installment_payments` ALTER COLUMN `bill_amount` DROP DEFAULT,
    ALTER COLUMN `principal_bill` DROP DEFAULT,
    ALTER COLUMN `service_fee` DROP DEFAULT,
    ALTER COLUMN `remain_principal_bill` DROP DEFAULT,
    ALTER COLUMN `remain_service_fee` DROP DEFAULT;

-- AlterTable
ALTER TABLE `loan_bills` ALTER COLUMN `bill_amount` DROP DEFAULT,
    ALTER COLUMN `principal_bill` DROP DEFAULT,
    ALTER COLUMN `service_fee` DROP DEFAULT,
    ALTER COLUMN `bill_paid` DROP DEFAULT,
    ALTER COLUMN `remain_principal_bill` DROP DEFAULT,
    ALTER COLUMN `remain_service_fee` DROP DEFAULT;

-- AlterTable
ALTER TABLE `loan_interests` ALTER COLUMN `bunga_pinjaman` DROP DEFAULT;

-- AlterTable
ALTER TABLE `plafonds` ALTER COLUMN `plafond` DROP DEFAULT;

-- DropForeignKey
ALTER TABLE `cultivations` DROP FOREIGN KEY `cultivations_cultivation_report_id_fkey`;

-- AlterTable
ALTER TABLE `cultivation_reports` ADD COLUMN `cultivation_id` INTEGER NOT NULL AFTER `id`;

-- AlterTable
ALTER TABLE `cultivations` DROP COLUMN `cultivation_report_id`;

-- AddForeignKey
ALTER TABLE `cultivation_reports` ADD CONSTRAINT `cultivation_reports_cultivation_id_fkey` FOREIGN KEY (`cultivation_id`) REFERENCES `cultivations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE `cultivations` ADD COLUMN `status` VARCHAR(45) NULL AFTER `nama_penanggung_jawab`;
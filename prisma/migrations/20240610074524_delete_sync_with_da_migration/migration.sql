/*
  Warnings:

  - You are about to alter the column `estimasi_omset_per_bulan` on the `applications` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,0)` to `Double`.
  - You are about to alter the column `estimasi_biaya_per_bulan` on the `applications` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,0)` to `Double`.
  - You are about to alter the column `estimasi_laba_per_bulan` on the `applications` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,0)` to `Double`.
  - You are about to alter the column `estimasi_biaya_rumah_tangga` on the `applications` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,0)` to `Double`.
  - You are about to alter the column `manual_cost` on the `banks` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,0)` to `Double`.
  - You are about to alter the column `instant_cost` on the `banks` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,0)` to `Double`.
  - You are about to alter the column `bill_amount` on the `installment_payments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,0)` to `Double`.
  - You are about to alter the column `principal_bill` on the `installment_payments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,0)` to `Double`.
  - You are about to alter the column `service_fee` on the `installment_payments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,0)` to `Double`.
  - You are about to alter the column `payment_amount` on the `installment_payments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,0)` to `Double`.
  - You are about to alter the column `remain_principal_bill` on the `installment_payments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,0)` to `Double`.
  - You are about to alter the column `remain_service_fee` on the `installment_payments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,0)` to `Double`.
  - You are about to alter the column `tagihan` on the `installments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,0)` to `Decimal(15,2)`.
  - You are about to alter the column `total_tagihan` on the `installments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,0)` to `Decimal(15,2)`.
  - You are about to alter the column `realisasi_plafond` on the `installments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,0)` to `Decimal(15,2)`.
  - You are about to alter the column `bill_amount` on the `loan_bills` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,0)` to `Double`.
  - You are about to alter the column `principal_bill` on the `loan_bills` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,0)` to `Double`.
  - You are about to alter the column `service_fee` on the `loan_bills` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,0)` to `Double`.
  - You are about to alter the column `bill_paid` on the `loan_bills` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,0)` to `Double`.
  - You are about to alter the column `remain_principal_bill` on the `loan_bills` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,0)` to `Double`.
  - You are about to alter the column `remain_service_fee` on the `loan_bills` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,0)` to `Double`.
  - You are about to alter the column `bunga_pinjaman` on the `loan_interests` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,0)` to `Double`.
  - You are about to alter the column `plafond` on the `plafonds` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,0)` to `Double`.
  - You are about to alter the column `sisihan_piutang` on the `remains` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,0)` to `Double`.
  - You are about to alter the column `sisihan_pnbp` on the `remains` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,0)` to `Double`.
  - You are about to alter the column `amount_principal_bill` on the `unpaid_bills` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,0)` to `Double`.
  - You are about to alter the column `amount_service_fee` on the `unpaid_bills` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,0)` to `Double`.

*/
-- DropForeignKey
ALTER TABLE `applications` DROP FOREIGN KEY `applications_bank_id_fkey`;

-- DropForeignKey
ALTER TABLE `applications` DROP FOREIGN KEY `applications_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `business_accounts` DROP FOREIGN KEY `business_accounts_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `business_profile_ecommerces` DROP FOREIGN KEY `business_profile_ecommerces_business_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `business_profile_ecommerces` DROP FOREIGN KEY `business_profile_ecommerces_ecommerce_id_fkey`;

-- DropForeignKey
ALTER TABLE `business_profile_marketing_reaches` DROP FOREIGN KEY `business_profile_marketing_reaches_business_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `business_profile_marketing_reaches` DROP FOREIGN KEY `business_profile_marketing_reaches_marketing_reach_id_fkey`;

-- DropForeignKey
ALTER TABLE `business_profiles` DROP FOREIGN KEY `business_profiles_harbor_id_fkey`;

-- DropForeignKey
ALTER TABLE `business_profiles` DROP FOREIGN KEY `business_profiles_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `collectability` DROP FOREIGN KEY `collectability_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `loan_bills` DROP FOREIGN KEY `loan_bills_installment_id_fkey`;

-- DropForeignKey
ALTER TABLE `notifications` DROP FOREIGN KEY `notifications_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `remains` DROP FOREIGN KEY `remains_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `role_notifications` DROP FOREIGN KEY `role_notifications_notification_id_fkey`;

-- DropForeignKey
ALTER TABLE `role_notifications` DROP FOREIGN KEY `role_notifications_role_id_fkey`;

-- DropForeignKey
ALTER TABLE `roles` DROP FOREIGN KEY `roles_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_application_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_types` DROP FOREIGN KEY `user_types_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `va` DROP FOREIGN KEY `va_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `villages` DROP FOREIGN KEY `villages_district_id_fkey`;

-- DropForeignKey
ALTER TABLE `wallets` DROP FOREIGN KEY `wallets_user_id_fkey`;

-- AlterTable
ALTER TABLE `applications` MODIFY `estimasi_omset_per_bulan` DOUBLE NOT NULL,
    MODIFY `estimasi_biaya_per_bulan` DOUBLE NOT NULL,
    MODIFY `estimasi_laba_per_bulan` DOUBLE NOT NULL,
    MODIFY `estimasi_biaya_rumah_tangga` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `banks` MODIFY `manual_cost` DOUBLE NOT NULL,
    MODIFY `instant_cost` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `installment_payments` MODIFY `bill_amount` DOUBLE NOT NULL,
    MODIFY `principal_bill` DOUBLE NULL,
    MODIFY `installment_payment_id` VARCHAR(191) NULL,
    MODIFY `service_fee` DOUBLE NULL,
    MODIFY `transaction_date` DATETIME(3) NULL,
    MODIFY `payment_amount` DOUBLE NOT NULL,
    MODIFY `remain_principal_bill` DOUBLE NULL,
    MODIFY `remain_service_fee` DOUBLE NULL;

-- AlterTable
ALTER TABLE `installments` MODIFY `tagihan` DECIMAL(15, 2) NULL,
    MODIFY `total_tagihan` DECIMAL(15, 2) NULL,
    MODIFY `realisasi_plafond` DECIMAL(15, 2) NULL;

-- AlterTable
ALTER TABLE `loan_bills` MODIFY `bill_amount` DOUBLE NOT NULL,
    MODIFY `principal_bill` DOUBLE NULL,
    MODIFY `service_fee` DOUBLE NULL,
    MODIFY `bill_paid` DOUBLE NULL,
    MODIFY `remain_principal_bill` DOUBLE NULL,
    MODIFY `remain_service_fee` DOUBLE NULL;

-- AlterTable
ALTER TABLE `loan_interests` MODIFY `bunga_pinjaman` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `plafonds` MODIFY `plafond` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `remains` MODIFY `sisihan_piutang` DOUBLE NOT NULL,
    MODIFY `sisihan_pnbp` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `unpaid_bills` MODIFY `amount_principal_bill` DOUBLE NULL,
    MODIFY `amount_service_fee` DOUBLE NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `phone_number` VARCHAR(45) NULL;

-- CreateTable
CREATE TABLE `rekap` (
    `id` INTEGER NOT NULL,
    `installment_id` INTEGER NOT NULL,
    `pokok_terbayar` DECIMAL(15, 2) NOT NULL,
    `bunga_terbayar` DECIMAL(15, 2) NOT NULL,
    `tunggakan_pokok` DECIMAL(15, 2) NOT NULL,
    `tunggakan_bunga` DECIMAL(15, 2) NOT NULL,
    `umur_tunggakan_pokok` INTEGER NOT NULL,
    `umur_tunggakan_bunga` INTEGER NOT NULL,
    `outstanding_pokok` DECIMAL(15, 2) NOT NULL,
    `outstanding_bunga` DECIMAL(15, 2) NOT NULL,
    `status_kredit` VARCHAR(255) NOT NULL,
    `sistem_angsuran` VARCHAR(255) NOT NULL,
    `tahun_lunas` INTEGER NOT NULL,
    `tgl_jatuh_tempo` DATE NOT NULL,
    `tgl_terakhir_bayar` DATE NOT NULL,
    `tgl_cair` DATE NOT NULL,
    `keterangan` VARCHAR(255) NOT NULL,

    INDEX `fk_rekap_installment_id`(`installment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `roles` ADD CONSTRAINT `roles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_profiles` ADD CONSTRAINT `business_profiles_harbor_id_fkey` FOREIGN KEY (`harbor_id`) REFERENCES `harbors`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_profiles` ADD CONSTRAINT `business_profiles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_profile_marketing_reaches` ADD CONSTRAINT `business_profile_marketing_reaches_business_profile_id_fkey` FOREIGN KEY (`business_profile_id`) REFERENCES `business_profiles`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_profile_marketing_reaches` ADD CONSTRAINT `business_profile_marketing_reaches_marketing_reach_id_fkey` FOREIGN KEY (`marketing_reach_id`) REFERENCES `marketing_reaches`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_profile_ecommerces` ADD CONSTRAINT `business_profile_ecommerces_business_profile_id_fkey` FOREIGN KEY (`business_profile_id`) REFERENCES `business_profiles`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_profile_ecommerces` ADD CONSTRAINT `business_profile_ecommerces_ecommerce_id_fkey` FOREIGN KEY (`ecommerce_id`) REFERENCES `ecommerces`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_accounts` ADD CONSTRAINT `business_accounts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applications` ADD CONSTRAINT `applications_bank_id_fkey` FOREIGN KEY (`bank_id`) REFERENCES `banks`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applications` ADD CONSTRAINT `applications_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `loan_bills` ADD CONSTRAINT `loan_bills_installment_id_fkey` FOREIGN KEY (`installment_id`) REFERENCES `installments`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `collectability` ADD CONSTRAINT `collectability_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

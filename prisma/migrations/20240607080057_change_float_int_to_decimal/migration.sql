/*
  Warnings:

  - You are about to alter the column `total_pencairan` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal(15,0)`.

*/
-- AlterTable
ALTER TABLE `applications` MODIFY `estimasi_omset_per_bulan` DECIMAL(15, 0) NOT NULL,
    MODIFY `estimasi_biaya_per_bulan` DECIMAL(15, 0) NOT NULL,
    MODIFY `estimasi_laba_per_bulan` DECIMAL(15, 0) NOT NULL,
    MODIFY `estimasi_biaya_rumah_tangga` DECIMAL(15, 0) NOT NULL;

-- AlterTable
ALTER TABLE `banks` MODIFY `manual_cost` DECIMAL(15, 0) NOT NULL,
    MODIFY `instant_cost` DECIMAL(15, 0) NOT NULL;

-- AlterTable
ALTER TABLE `business_profiles` MODIFY `estimasi_nilai_asset` DECIMAL(15, 0) NOT NULL;

-- AlterTable
ALTER TABLE `installment_payments` MODIFY `bill_amount` DECIMAL(15, 0) NOT NULL,
    MODIFY `principal_bill` DECIMAL(15, 0) NULL,
    MODIFY `service_fee` DECIMAL(15, 0) NULL,
    MODIFY `payment_amount` DECIMAL(15, 0) NOT NULL,
    MODIFY `remain_principal_bill` DECIMAL(15, 0) NULL,
    MODIFY `remain_service_fee` DECIMAL(15, 0) NULL;

-- AlterTable
ALTER TABLE `installments` MODIFY `tagihan` DECIMAL(15, 0) NULL,
    MODIFY `total_tagihan` DECIMAL(15, 0) NULL,
    MODIFY `realisasi_plafond` DECIMAL(15, 0) NULL;

-- AlterTable
ALTER TABLE `loan_bills` MODIFY `bill_amount` DECIMAL(15, 0) NOT NULL,
    MODIFY `principal_bill` DECIMAL(15, 0) NULL,
    MODIFY `service_fee` DECIMAL(15, 0) NULL,
    MODIFY `bill_paid` DECIMAL(15, 0) NULL,
    MODIFY `remain_principal_bill` DECIMAL(15, 0) NULL,
    MODIFY `remain_service_fee` DECIMAL(15, 0) NULL;

-- AlterTable
ALTER TABLE `loan_interests` MODIFY `bunga_pinjaman` DECIMAL(15, 0) NOT NULL;

-- AlterTable
ALTER TABLE `operational_logbooks` MODIFY `amount` DECIMAL(15, 0) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `payment_methods` MODIFY `percentage_cost` DECIMAL(15, 0) NULL;

-- AlterTable
ALTER TABLE `plafonds` MODIFY `plafond` DECIMAL(15, 0) NOT NULL;

-- AlterTable
ALTER TABLE `remains` MODIFY `sisihan_piutang` DECIMAL(15, 0) NOT NULL,
    MODIFY `sisihan_pnbp` DECIMAL(15, 0) NOT NULL;

-- AlterTable
ALTER TABLE `transactions` MODIFY `total_pencairan` DECIMAL(15, 0) NULL;

-- AlterTable
ALTER TABLE `unpaid_bills` MODIFY `amount_principal_bill` DECIMAL(15, 0) NULL,
    MODIFY `amount_service_fee` DECIMAL(15, 0) NULL;

-- AlterTable
ALTER TABLE `va` MODIFY `va_principal_bill` DECIMAL(15, 0) NOT NULL,
    MODIFY `va_service_bill` DECIMAL(15, 0) NOT NULL;

-- AlterTable
ALTER TABLE `wallets` MODIFY `balance` DECIMAL(15, 0) NOT NULL;

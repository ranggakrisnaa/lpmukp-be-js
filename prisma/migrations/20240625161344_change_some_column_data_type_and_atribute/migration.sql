-- AlterTable
ALTER TABLE `applications` MODIFY `estimasi_omset_per_bulan` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `estimasi_biaya_per_bulan` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `estimasi_laba_per_bulan` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `estimasi_biaya_rumah_tangga` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `banks` MODIFY `manual_cost` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `instant_cost` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `comodity_types` MODIFY `price` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `cultivation_reports` MODIFY `feed_quantity` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `berat_ikan` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `jumlah_ikan_mati` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `cultivation_results` MODIFY `jumlah_panen` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `sale_price` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `cultivations` MODIFY `pond_quantity` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `pond_capacity` DOUBLE NOT NULL DEFAULT 0;

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

-- AlterTable
ALTER TABLE `seed_spreads` MODIFY `quantity` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `rerata_berat_bibit` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `target_jumlah_panen` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `feed_convension_rate` DOUBLE NOT NULL DEFAULT 0;

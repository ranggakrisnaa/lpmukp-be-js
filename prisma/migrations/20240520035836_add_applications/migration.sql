-- CreateTable
CREATE TABLE `applications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `application_id` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `code` VARCHAR(45) NOT NULL,
    `alamat_usaha` VARCHAR(255) NOT NULL,
    `lama_siklus_usaha` VARCHAR(255) NOT NULL,
    `estimasi_omset_per_bulan` DOUBLE NOT NULL DEFAULT 0,
    `estimasi_biaya_per_bulan` DOUBLE NOT NULL DEFAULT 0,
    `estimasi_laba_per_bulan` DOUBLE NOT NULL DEFAULT 0,
    `estimasi_biaya_rumah_tangga` DOUBLE NOT NULL DEFAULT 0,
    `tujuan_pembiayaan` VARCHAR(45) NOT NULL,
    `pendapatan_diluar_usaha` VARCHAR(15) NOT NULL,
    `account_ownership` VARCHAR(45) NOT NULL,
    `account_number` VARCHAR(45) NOT NULL,
    `bank_id` INTEGER NOT NULL,
    `desired_financing` VARCHAR(45) NOT NULL,
    `jangka_waktu` INTEGER NOT NULL DEFAULT 0,
    `status` VARCHAR(45) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `applications_application_id_key`(`application_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `applications` ADD CONSTRAINT `applications_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applications` ADD CONSTRAINT `applications_bank_id_fkey` FOREIGN KEY (`bank_id`) REFERENCES `banks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
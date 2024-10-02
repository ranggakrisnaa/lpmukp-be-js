-- CreateTable
CREATE TABLE `cultivations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `seed_spread_id` INTEGER NOT NULL,
    `cultivation_result_id` INTEGER NOT NULL,
    `pond_name` VARCHAR(255) NOT NULL,
    `pond_quantity` DOUBLE NOT NULL,
    `pond_capacity` DOUBLE NOT NULL,
    `pond_address` TEXT NOT NULL,
    `phone_number` VARCHAR(45) NOT NULL,
    `nama_penanggung_jawab` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `cultivations_seed_spread_id_key`(`seed_spread_id`),
    UNIQUE INDEX `cultivations_cultivation_result_id_key`(`cultivation_result_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cultivation_results` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal_panen` DATE NOT NULL,
    `jumlah_panen` DOUBLE NOT NULL,
    `sale_price` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cultivation_reports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `feed_type` VARCHAR(100) NOT NULL,
    `feed_quantity` DOUBLE NOT NULL,
    `berat_ikan` DOUBLE NOT NULL,
    `jumlah_ikan_mati` DOUBLE NOT NULL,
    `catatan` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `seed_spreads` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comodity_type_id` INTEGER NOT NULL,
    `cultivation_report_id` INTEGER NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `rerata_berat_bibit` DOUBLE NOT NULL,
    `target_jumlah_panen` DOUBLE NOT NULL,
    `survival_rate` DECIMAL(15, 2) NOT NULL,
    `feed_convension_rate` DOUBLE NOT NULL,
    `price` DECIMAL(15, 2) NOT NULL,
    `spread_date` DATE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comodity_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(60) NOT NULL,
    `price` DECIMAL(15, 2) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cultivations` ADD CONSTRAINT `cultivations_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cultivations` ADD CONSTRAINT `cultivations_seed_spread_id_fkey` FOREIGN KEY (`seed_spread_id`) REFERENCES `seed_spreads`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cultivations` ADD CONSTRAINT `cultivations_cultivation_result_id_fkey` FOREIGN KEY (`cultivation_result_id`) REFERENCES `cultivation_results`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `seed_spreads` ADD CONSTRAINT `seed_spreads_comodity_type_id_fkey` FOREIGN KEY (`comodity_type_id`) REFERENCES `comodity_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `seed_spreads` ADD CONSTRAINT `seed_spreads_cultivation_report_id_fkey` FOREIGN KEY (`cultivation_report_id`) REFERENCES `cultivation_reports`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

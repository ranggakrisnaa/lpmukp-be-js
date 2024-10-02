-- CreateTable
CREATE TABLE `profiles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `profile_id` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NULL,
    `name` VARCHAR(255) NULL,
    `nik` VARCHAR(45) NULL,
    `photo` VARCHAR(255) NULL,
    `id_card` VARCHAR(255) NULL,
    `npwp_photo` VARCHAR(255) NULL,
    `slik_file` VARCHAR(255) NULL,
    `id_card_selfie` VARCHAR(255) NULL,
    `gender` VARCHAR(45) NULL,
    `no_npwp` VARCHAR(45) NULL,
    `debitur_type` VARCHAR(45) NULL,
    `place_birth` VARCHAR(255) NULL,
    `date_birth` DATE NULL,
    `marital_status` VARCHAR(45) NULL,
    `no_kusuka` VARCHAR(45) NULL,
    `email` VARCHAR(45) NULL,
    `address` TEXT NULL,
    `jumlah_tanggungan` INTEGER NULL DEFAULT 0,
    `alamat_domisili` VARCHAR(255) NULL,
    `village_id` INTEGER NULL,
    `district_id` INTEGER NULL,
    `city_id` INTEGER NULL,
    `province_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `profiles_profile_id_key`(`profile_id`),
    UNIQUE INDEX `profiles_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE `profiles` DROP FOREIGN KEY `profiles_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_village_id_fkey` FOREIGN KEY (`village_id`) REFERENCES `villages`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_district_id_fkey` FOREIGN KEY (`district_id`) REFERENCES `districts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_province_id_fkey` FOREIGN KEY (`province_id`) REFERENCES `provinces`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

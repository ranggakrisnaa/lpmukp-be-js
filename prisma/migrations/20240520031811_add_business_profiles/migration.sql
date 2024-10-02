-- CreateTable
CREATE TABLE `business_profiles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `business_profile_id` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NULL,
    `lama_usaha` VARCHAR(45) NOT NULL,
    `jenis_asset` VARCHAR(45) NOT NULL,
    `estimasi_nilai_asset` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `business_profiles_business_profile_id_key`(`business_profile_id`),
    UNIQUE INDEX `business_profiles_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `business_profiles` ADD CONSTRAINT `business_profiles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

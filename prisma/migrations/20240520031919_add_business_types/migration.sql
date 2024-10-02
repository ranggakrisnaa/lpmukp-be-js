-- AlterTable
ALTER TABLE `business_profiles` ADD COLUMN `business_type_id` INTEGER NULL AFTER `user_id`;

-- CreateTable
CREATE TABLE `business_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `business_profiles` ADD CONSTRAINT `business_profiles_business_type_id_fkey` FOREIGN KEY (`business_type_id`) REFERENCES `business_types`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

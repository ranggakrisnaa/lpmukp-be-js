-- CreateTable
CREATE TABLE `business_profile_marketing_reaches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `business_profile_id` INTEGER NOT NULL,
    `marketing_reach_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `business_profile_marketing_reaches` ADD CONSTRAINT `business_profile_marketing_reaches_business_profile_id_fkey` FOREIGN KEY (`business_profile_id`) REFERENCES `business_profiles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_profile_marketing_reaches` ADD CONSTRAINT `business_profile_marketing_reaches_marketing_reach_id_fkey` FOREIGN KEY (`marketing_reach_id`) REFERENCES `marketing_reaches`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
-- CreateTable
CREATE TABLE `automatic_records` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `coa_sub_category_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `automatic_records` ADD CONSTRAINT `automatic_records_coa_sub_category_id_fkey` FOREIGN KEY (`coa_sub_category_id`) REFERENCES `coa_sub_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

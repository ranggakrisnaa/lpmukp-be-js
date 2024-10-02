-- CreateTable
CREATE TABLE `coas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(255) NOT NULL,
    `name` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `coa_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `coa_sub_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `coa_category_id` INTEGER NOT NULL,
    `name` TEXT NOT NULL,
    `debit_coa_id` INTEGER NOT NULL,
    `credit_coa_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `coa_sub_categories` ADD CONSTRAINT `coa_sub_categories_coa_category_id_fkey` FOREIGN KEY (`coa_category_id`) REFERENCES `coa_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `coa_sub_categories` ADD CONSTRAINT `coa_sub_categories_debit_coa_id_fkey` FOREIGN KEY (`debit_coa_id`) REFERENCES `coas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `coa_sub_categories` ADD CONSTRAINT `coa_sub_categories_credit_coa_id_fkey` FOREIGN KEY (`credit_coa_id`) REFERENCES `coas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

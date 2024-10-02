-- CreateTable
CREATE TABLE `general_journals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NULL,
    `coa_sub_category_id` INTEGER NOT NULL,
    `debit_coa_id` INTEGER NULL,
    `credit_coa_id` INTEGER NULL,
    `date` DATE NOT NULL,
    `debit_amount` DECIMAL(15, 2) NOT NULL,
    `credit_amount` DECIMAL(15, 2) NOT NULL,
    `note` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    INDEX `general_journals_coa_sub_category_id_fkey`(`coa_sub_category_id`),
    INDEX `general_journals_credit_coa_id_fkey`(`credit_coa_id`),
    INDEX `general_journals_debit_coa_id_fkey`(`debit_coa_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `general_journals` ADD CONSTRAINT `general_journals_coa_sub_category_id_fkey` FOREIGN KEY (`coa_sub_category_id`) REFERENCES `coa_sub_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `general_journals` ADD CONSTRAINT `general_journals_debit_coa_id_fkey` FOREIGN KEY (`debit_coa_id`) REFERENCES `coas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `general_journals` ADD CONSTRAINT `general_journals_credit_coa_id_fkey` FOREIGN KEY (`credit_coa_id`) REFERENCES `coas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

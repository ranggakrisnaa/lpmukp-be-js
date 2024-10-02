-- AlterTable
ALTER TABLE `business_accounts` ADD COLUMN `bank_id` INTEGER NULL AFTER `user_id`;

-- CreateTable
CREATE TABLE `banks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `code` VARCHAR(45) NOT NULL,
    `logo` VARCHAR(45) NOT NULL,
    `manual` BOOLEAN NOT NULL DEFAULT false,
    `manual_cost` DOUBLE NOT NULL DEFAULT 0,
    `instant` BOOLEAN NOT NULL DEFAULT false,
    `instant_cost` DOUBLE NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `business_accounts` ADD CONSTRAINT `business_accounts_bank_id_fkey` FOREIGN KEY (`bank_id`) REFERENCES `banks`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE `installments` ADD COLUMN `plafond_id` INTEGER NULL AFTER `loan_interest_id`;

-- CreateTable
CREATE TABLE `plafonds` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plafond` DOUBLE NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `plafonds_plafond_key`(`plafond`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `installments` ADD CONSTRAINT `installments_plafond_id_fkey` FOREIGN KEY (`plafond_id`) REFERENCES `plafonds`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

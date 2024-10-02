-- AlterTable
ALTER TABLE `installments` ADD COLUMN `loan_interest_id` INTEGER NULL AFTER `id`;

-- CreateTable
CREATE TABLE `loan_interests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bunga_pinjaman` DOUBLE NOT NULL DEFAULT 0,
    `jangka_waktu` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `installments` ADD CONSTRAINT `installments_loan_interest_id_fkey` FOREIGN KEY (`loan_interest_id`) REFERENCES `loan_interests`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE `loan_interests` DROP COLUMN `jangka_waktu`;
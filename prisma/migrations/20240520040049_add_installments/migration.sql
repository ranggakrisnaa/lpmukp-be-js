-- AlterTable
ALTER TABLE `applications` ADD COLUMN `installment_id` INTEGER NULL AFTER `user_id`;

-- CreateTable
CREATE TABLE `installments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tagihan` DOUBLE NULL DEFAULT 0,
    `total_tagihan` DOUBLE NULL DEFAULT 0,
    `realisasi_plafond` DOUBLE NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `applications` ADD CONSTRAINT `applications_installment_id_fkey` FOREIGN KEY (`installment_id`) REFERENCES `installments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
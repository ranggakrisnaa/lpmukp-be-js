/*
  Warnings:

  - You are about to alter the column `transaction_date` on the `installment_payments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.

*/

-- CreateTable
CREATE TABLE `operational_logbooks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `date` DATE NOT NULL,
    `category` VARCHAR(45) NOT NULL,
    `description` TEXT NOT NULL,
    `type` ENUM('Pengeluaran', 'Pemasukan') NOT NULL DEFAULT 'Pemasukan',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `operational_logbooks` ADD CONSTRAINT `operational_logbooks_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE `operational_logbooks` ADD COLUMN `amount` DOUBLE NOT NULL DEFAULT 0 AFTER `category`;
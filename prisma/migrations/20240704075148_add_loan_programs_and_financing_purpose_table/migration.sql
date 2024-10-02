/*
  Warnings:

  - You are about to drop the column `tujuan_pembiayaan` on the `applications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `applications` DROP COLUMN `tujuan_pembiayaan`,
    ADD COLUMN `financing_purpose_id` INTEGER NULL AFTER `installment_id`,
    ADD COLUMN `loan_program_id` INTEGER NULL AFTER `financing_purpose_id`;

-- CreateTable
CREATE TABLE `loan_programs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `financing_purposes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `applications` ADD CONSTRAINT `applications_loan_program_id_fkey` FOREIGN KEY (`loan_program_id`) REFERENCES `loan_programs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applications` ADD CONSTRAINT `applications_financing_purpose_id_fkey` FOREIGN KEY (`financing_purpose_id`) REFERENCES `financing_purposes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `logbook_photo_id` to the `logbook_activities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `logbook_activities` ADD COLUMN `logbook_photo_id` INTEGER NOT NULL,
    MODIFY `nama_debitur` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `logbook_photos` (
    `id` INTEGER NOT NULL,
    `photo` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `logbook_activities` ADD CONSTRAINT `logbook_activities_logbook_photo_id_fkey` FOREIGN KEY (`logbook_photo_id`) REFERENCES `logbook_photos`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

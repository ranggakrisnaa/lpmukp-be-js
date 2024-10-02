/*
  Warnings:

  - You are about to drop the column `logbook_photo_id` on the `logbook_activities` table. All the data in the column will be lost.
  - Added the required column `logbook_activity_id` to the `logbook_photos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `logbook_activities` DROP FOREIGN KEY `logbook_activities_logbook_photo_id_fkey`;

-- AlterTable
ALTER TABLE `logbook_activities` DROP COLUMN `logbook_photo_id`;

-- AlterTable
ALTER TABLE `logbook_photos` ADD COLUMN `logbook_activity_id` INTEGER NULL AFTER `id`;

-- AddForeignKey
ALTER TABLE `logbook_photos` ADD CONSTRAINT `logbook_photos_logbook_activity_id_fkey` FOREIGN KEY (`logbook_activity_id`) REFERENCES `logbook_activities`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

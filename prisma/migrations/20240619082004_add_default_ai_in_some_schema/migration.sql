ALTER TABLE `logbook_activities` DROP FOREIGN KEY `logbook_activities_logbook_photo_id_fkey`;

ALTER TABLE `logbook_photos` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

ALTER TABLE `logbook_activities` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

ALTER TABLE `logbook_activities`
ADD CONSTRAINT `logbook_activities_logbook_photo_id_fkey` FOREIGN KEY (`logbook_photo_id`) REFERENCES `logbook_photos`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE `rekap` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

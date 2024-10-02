/*
  Warnings:

  - Made the column `district_id` on table `villages` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `villages` MODIFY `district_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `villages` ADD CONSTRAINT `villages_district_id_fkey` FOREIGN KEY (`district_id`) REFERENCES `districts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `harbor_id` to the `business_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `business_profiles` ADD COLUMN `harbor_id` INTEGER NOT NULL AFTER `user_id`;

-- AddForeignKey
ALTER TABLE `business_profiles` ADD CONSTRAINT `business_profiles_harbor_id_fkey` FOREIGN KEY (`harbor_id`) REFERENCES `harbors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE `profiles` MODIFY `alamat_domisili` TEXT NULL;

-- AlterTable
ALTER TABLE `profiles` MODIFY `village_id` INT NULL AFTER `user_id`;

-- AlterTable
ALTER TABLE `profiles` MODIFY `district_id` INT NULL AFTER `village_id`;

-- AlterTable
ALTER TABLE `profiles` MODIFY `city_id` INT NULL AFTER `district_id`;

-- AlterTable
ALTER TABLE `profiles` MODIFY `province_id` INT NULL AFTER `city_id`;
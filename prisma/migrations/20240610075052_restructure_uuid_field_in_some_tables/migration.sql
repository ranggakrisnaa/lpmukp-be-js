-- AlterTable
ALTER TABLE `applications` MODIFY COLUMN `uuid` VARCHAR(191) NULL AFTER `id`;

-- AlterTable
ALTER TABLE `business_profiles` MODIFY COLUMN `uuid` VARCHAR(191) NOT NULL AFTER `id`;

-- AlterTable
ALTER TABLE `payment_methods` MODIFY COLUMN `uuid` VARCHAR(191) NOT NULL AFTER `id`;

-- AlterTable
ALTER TABLE `profiles` MODIFY COLUMN `uuid` VARCHAR(191) NULL AFTER `id`;

-- AlterTable
ALTER TABLE `users`MODIFY COLUMN `uuid` VARCHAR(191) NULL AFTER `id`;

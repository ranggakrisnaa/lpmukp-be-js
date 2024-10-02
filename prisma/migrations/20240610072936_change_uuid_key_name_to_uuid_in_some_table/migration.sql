/*
  Warnings:

  - You are about to drop the column `application_id` on the `applications` table. All the data in the column will be lost.
  - You are about to drop the column `business_profile_id` on the `business_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method_id` on the `payment_methods` table. All the data in the column will be lost.
  - You are about to drop the column `profile_id` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `applications` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `business_profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `payment_methods` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `business_profiles` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `payment_methods` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX `applications_application_id_key` ON `applications`;

-- DropIndex
DROP INDEX `business_profiles_business_profile_id_key` ON `business_profiles`;

-- DropIndex
DROP INDEX `payment_methods_payment_method_id_key` ON `payment_methods`;

-- DropIndex
DROP INDEX `profiles_profile_id_key` ON `profiles`;

-- DropIndex
DROP INDEX `users_user_id_key` ON `users`;

-- AlterTable
ALTER TABLE `applications` DROP COLUMN `application_id`,
    ADD COLUMN `uuid` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `business_profiles` DROP COLUMN `business_profile_id`,
    ADD COLUMN `uuid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `payment_methods` DROP COLUMN `payment_method_id`,
    ADD COLUMN `uuid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `profiles` DROP COLUMN `profile_id`,
    ADD COLUMN `uuid` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `user_id`,
    ADD COLUMN `uuid` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `applications_uuid_key` ON `applications`(`uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `business_profiles_uuid_key` ON `business_profiles`(`uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `payment_methods_uuid_key` ON `payment_methods`(`uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `profiles_uuid_key` ON `profiles`(`uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `users_uuid_key` ON `users`(`uuid`);

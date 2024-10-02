/*
  Warnings:

  - You are about to drop the column `harbor_id` on the `business_profiles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `business_profiles` DROP FOREIGN KEY `business_profiles_harbor_id_fkey`;

-- AlterTable
ALTER TABLE `business_profiles` DROP COLUMN `harbor_id`;

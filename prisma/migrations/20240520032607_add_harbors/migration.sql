/*
  Warnings:

  - A unique constraint covering the columns `[harbor_id]` on the table `business_profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `harbor_id` to the `business_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `business_profiles` ADD COLUMN `harbor_id` INTEGER NOT NULL AFTER `business_type_id`;

-- CreateTable
CREATE TABLE `harbors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `business_profiles_harbor_id_key` ON `business_profiles`(`harbor_id`);

-- AddForeignKey
ALTER TABLE `business_profiles` ADD CONSTRAINT `business_profiles_harbor_id_fkey` FOREIGN KEY (`harbor_id`) REFERENCES `harbors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

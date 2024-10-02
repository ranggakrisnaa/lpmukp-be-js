/*
  Warnings:

  - You are about to drop the column `content` on the `notifications` table. All the data in the column will be lost.
  - Added the required column `status` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `notifications` DROP COLUMN `content`,
    ADD COLUMN `status` VARCHAR(60) NOT NULL;

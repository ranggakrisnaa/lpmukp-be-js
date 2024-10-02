/*
  Warnings:

  - You are about to drop the column `kolektabilitas_max` on the `collectability` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `role_notifications` DROP FOREIGN KEY `role_notifications_notification_id_fkey`;

-- DropForeignKey
ALTER TABLE `role_notifications` DROP FOREIGN KEY `role_notifications_role_id_fkey`;

-- DropForeignKey
ALTER TABLE `va` DROP FOREIGN KEY `va_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `villages` DROP FOREIGN KEY `villages_district_id_fkey`;

-- AlterTable
ALTER TABLE `applications` ADD COLUMN `partner_id` INTEGER NULL AFTER `user_id`,
    ADD COLUMN `sistem_angsuran` VARCHAR(255) NULL AFTER `jangka_waktu`;

-- AlterTable
ALTER TABLE `business_profiles` MODIFY `uuid` VARCHAR(191) NULL,
    MODIFY `harbor_id` INTEGER NULL,
    MODIFY `lama_usaha` VARCHAR(45) NULL,
    MODIFY `jenis_asset` VARCHAR(45) NULL,
    MODIFY `estimasi_nilai_asset` DECIMAL(15, 0) NULL;

-- AlterTable
ALTER TABLE `collectability` DROP COLUMN `kolektabilitas_max`;

-- AlterTable
ALTER TABLE `profiles` ADD COLUMN `debitur_category` VARCHAR(45) NULL AFTER `no_npwp`;

-- AlterTable
ALTER TABLE `rekap` MODIFY `id` INTEGER NOT NULL,
    MODIFY `pokok_terbayar` DECIMAL(15, 2) NULL,
    MODIFY `bunga_terbayar` DECIMAL(15, 2) NULL,
    MODIFY `tunggakan_pokok` DECIMAL(15, 2) NULL,
    MODIFY `tunggakan_bunga` DECIMAL(15, 2) NULL,
    MODIFY `umur_tunggakan_pokok` INTEGER NULL,
    MODIFY `umur_tunggakan_bunga` INTEGER NULL,
    MODIFY `outstanding_pokok` DECIMAL(15, 2) NULL,
    MODIFY `outstanding_bunga` DECIMAL(15, 2) NULL,
    MODIFY `status_kredit` VARCHAR(255) NULL,
    MODIFY `sistem_angsuran` VARCHAR(255) NULL,
    MODIFY `tahun_lunas` INTEGER NULL,
    MODIFY `tgl_jatuh_tempo` DATE NULL,
    MODIFY `tgl_terakhir_bayar` DATE NULL,
    MODIFY `tgl_cair` DATE NULL,
    MODIFY `keterangan` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `sistem_angsuran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sistem_angsuran` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `fk_partner_applications` ON `applications`(`partner_id`);

-- AddForeignKey
ALTER TABLE `villages` ADD CONSTRAINT `villages_district_id_fkey` FOREIGN KEY (`district_id`) REFERENCES `districts`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applications` ADD CONSTRAINT `fk_partner_applications` FOREIGN KEY (`partner_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `va` ADD CONSTRAINT `va_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_notifications` ADD CONSTRAINT `role_notifications_notification_id_fkey` FOREIGN KEY (`notification_id`) REFERENCES `notifications`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_notifications` ADD CONSTRAINT `role_notifications_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

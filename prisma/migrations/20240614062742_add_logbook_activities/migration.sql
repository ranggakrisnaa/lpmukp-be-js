-- CreateTable
CREATE TABLE `logbook_activities` (
    `id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `nama_debitur` VARCHAR(255) NOT NULL,
    `category` ENUM('Sosialisasi', 'Pendampingan_Debitur') NOT NULL DEFAULT 'Sosialisasi',
    `date` DATE NOT NULL,
    `description` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `logbook_activities` ADD CONSTRAINT `logbook_activities_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

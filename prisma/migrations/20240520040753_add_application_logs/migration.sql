-- CreateTable
CREATE TABLE `application_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `application_id` INTEGER NULL,
    `step` VARCHAR(255) NOT NULL,
    `status` VARCHAR(45) NOT NULL,
    `note` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `application_logs` ADD CONSTRAINT `application_logs_application_id_fkey` FOREIGN KEY (`application_id`) REFERENCES `applications`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

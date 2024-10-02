ALTER TABLE `notifications`
    MODIFY COLUMN `status` VARCHAR(60) NOT NULL AFTER `title`;

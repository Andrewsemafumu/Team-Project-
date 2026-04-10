-- AlterTable
ALTER TABLE `User` ADD COLUMN `specialtyID` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Specialty` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_specialtyID_fkey` FOREIGN KEY (`specialtyID`) REFERENCES `Specialty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_specialtyID_fkey`;

-- DropIndex
DROP INDEX `User_specialtyID_fkey` ON `User`;

-- AlterTable
ALTER TABLE `User` MODIFY `specialtyID` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_specialtyID_fkey` FOREIGN KEY (`specialtyID`) REFERENCES `Specialty`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

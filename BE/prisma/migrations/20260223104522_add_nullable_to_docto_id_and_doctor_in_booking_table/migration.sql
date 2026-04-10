-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_doctorID_fkey`;

-- DropIndex
DROP INDEX `Booking_doctorID_fkey` ON `Booking`;

-- AlterTable
ALTER TABLE `Booking` MODIFY `doctorID` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_doctorID_fkey` FOREIGN KEY (`doctorID`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

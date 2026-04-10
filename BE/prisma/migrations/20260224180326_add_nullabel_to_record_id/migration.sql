-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_recordID_fkey`;

-- AlterTable
ALTER TABLE `Booking` MODIFY `recordID` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_recordID_fkey` FOREIGN KEY (`recordID`) REFERENCES `Record`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `noteID` on the `Booking` table. All the data in the column will be lost.
  - You are about to alter the column `birthdate` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `bookingID` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_noteID_fkey`;

-- DropIndex
DROP INDEX `Booking_noteID_key` ON `Booking`;

-- AlterTable
ALTER TABLE `Booking` DROP COLUMN `noteID`;

-- AlterTable
ALTER TABLE `Note` ADD COLUMN `bookingID` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `birthdate` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_bookingID_fkey` FOREIGN KEY (`bookingID`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

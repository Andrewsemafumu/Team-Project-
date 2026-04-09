/*
  Warnings:

  - You are about to drop the `BookingUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clientID` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctorID` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `BookingUser` DROP FOREIGN KEY `BookingUser_bookingID_fkey`;

-- DropForeignKey
ALTER TABLE `BookingUser` DROP FOREIGN KEY `BookingUser_userID_fkey`;

-- AlterTable
ALTER TABLE `Booking` ADD COLUMN `clientID` INTEGER NOT NULL,
    ADD COLUMN `doctorID` INTEGER NOT NULL;

-- DropTable
DROP TABLE `BookingUser`;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_clientID_fkey` FOREIGN KEY (`clientID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_doctorID_fkey` FOREIGN KEY (`doctorID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

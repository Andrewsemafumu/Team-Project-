/*
  Warnings:

  - You are about to alter the column `birthdate` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[recordID]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `recordID` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Booking` ADD COLUMN `recordID` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `birthdate` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `Record` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookingID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Booking_recordID_key` ON `Booking`(`recordID`);

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_recordID_fkey` FOREIGN KEY (`recordID`) REFERENCES `Record`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

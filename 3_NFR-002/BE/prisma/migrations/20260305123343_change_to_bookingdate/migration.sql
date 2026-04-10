/*
  Warnings:

  - You are about to drop the column `from` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `bookingDate` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Booking` DROP COLUMN `from`,
    DROP COLUMN `to`,
    ADD COLUMN `bookingDate` DATETIME(3) NOT NULL;

/*
  Warnings:

  - You are about to alter the column `birthdate` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `address` LONGTEXT NULL,
    MODIFY `birthdate` DATETIME NOT NULL;

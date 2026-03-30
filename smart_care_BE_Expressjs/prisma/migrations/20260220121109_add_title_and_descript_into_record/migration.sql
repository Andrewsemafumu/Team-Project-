/*
  Warnings:

  - You are about to alter the column `birthdate` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `descript` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Record` ADD COLUMN `descript` LONGTEXT NOT NULL,
    ADD COLUMN `title` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `birthdate` DATETIME NOT NULL;

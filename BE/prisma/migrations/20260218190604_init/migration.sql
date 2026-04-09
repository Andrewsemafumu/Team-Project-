-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `descript` LONGTEXT NULL,
    `sex` INTEGER NOT NULL DEFAULT 1,
    `mail` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `ava` VARCHAR(191) NULL,
    `pass` VARCHAR(191) NULL,
    `role` INTEGER NOT NULL,
    `date01` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `date02` DATETIME(3) NULL,
    `emailVerified` BOOLEAN NOT NULL DEFAULT false,
    `verifyToken` VARCHAR(255) NULL,

    UNIQUE INDEX `User_mail_key`(`mail`),
    UNIQUE INDEX `User_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `img` LONGTEXT NOT NULL,
    `title` LONGTEXT NOT NULL,
    `descript` LONGTEXT NULL,
    `from` DATETIME(3) NOT NULL,
    `to` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` BOOLEAN NOT NULL DEFAULT false,
    `date01` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `date02` DATETIME(3) NULL,
    `noteID` INTEGER NOT NULL,

    UNIQUE INDEX `Booking_noteID_key`(`noteID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookingUser` (
    `bookingID` INTEGER NOT NULL,
    `userID` INTEGER NOT NULL,

    PRIMARY KEY (`bookingID`, `userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Note` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` LONGTEXT NOT NULL,
    `descript` LONGTEXT NULL,
    `date01` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `date02` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_noteID_fkey` FOREIGN KEY (`noteID`) REFERENCES `Note`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingUser` ADD CONSTRAINT `BookingUser_bookingID_fkey` FOREIGN KEY (`bookingID`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingUser` ADD CONSTRAINT `BookingUser_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE `Total` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` VARCHAR(191) NOT NULL,
    `total` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

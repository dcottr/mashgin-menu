/*
  Warnings:

  - Made the column `imageURL` on table `MenuCategory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `MenuCategory` MODIFY `imageURL` VARCHAR(191) NOT NULL;

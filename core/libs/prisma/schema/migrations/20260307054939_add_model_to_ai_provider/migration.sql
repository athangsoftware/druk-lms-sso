/*
  Warnings:

  - Added the required column `model` to the `rpt_ai_providers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rpt_ai_providers` ADD COLUMN `model` VARCHAR(191) NOT NULL;

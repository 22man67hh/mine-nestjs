/*
  Warnings:

  - The `harvestDate` column on the `Crop` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Crop" DROP COLUMN "harvestDate",
ADD COLUMN     "harvestDate" TIMESTAMP(3);

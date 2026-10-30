-- CreateEnum
CREATE TYPE "CropType" AS ENUM ('WHEAT', 'RICE', 'FLOUR', 'CORN', 'VEGETABLE', 'FRUIT', 'PULSES', 'COTTON', 'OTHER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "otpExpiresAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Crop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "plantDate" TEXT NOT NULL,
    "harvestDate" TEXT NOT NULL,
    "quantity" INTEGER,
    "cropType" "CropType" NOT NULL,
    "unit" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Crop_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Crop" ADD CONSTRAINT "Crop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

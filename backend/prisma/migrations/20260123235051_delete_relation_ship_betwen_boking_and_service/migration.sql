/*
  Warnings:

  - You are about to drop the column `serviceId` on the `Booking` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_serviceId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "serviceId";

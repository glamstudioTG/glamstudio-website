/*
  Warnings:

  - You are about to drop the column `duraton` on the `BookingService` table. All the data in the column will be lost.
  - Added the required column `duration` to the `BookingService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookingService" DROP COLUMN "duraton",
ADD COLUMN     "duration" INTEGER NOT NULL;

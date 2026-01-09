/*
  Warnings:

  - The values [LASHIST] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `lashistId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `lashistId` on the `BusinessHours` table. All the data in the column will be lost.
  - You are about to drop the column `lashistId` on the `OverrideHours` table. All the data in the column will be lost.
  - You are about to drop the column `lashistId` on the `ScheduleBlock` table. All the data in the column will be lost.
  - You are about to drop the `Lashist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LashistCategory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[workerId,day]` on the table `BusinessHours` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `workerId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workerId` to the `BusinessHours` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('CLIENT', 'WORKER', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'CLIENT';
COMMIT;

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_lashistId_fkey";

-- DropForeignKey
ALTER TABLE "BusinessHours" DROP CONSTRAINT "BusinessHours_lashistId_fkey";

-- DropForeignKey
ALTER TABLE "Lashist" DROP CONSTRAINT "Lashist_userId_fkey";

-- DropForeignKey
ALTER TABLE "LashistCategory" DROP CONSTRAINT "LashistCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "LashistCategory" DROP CONSTRAINT "LashistCategory_lashistId_fkey";

-- DropForeignKey
ALTER TABLE "OverrideHours" DROP CONSTRAINT "OverrideHours_lashistId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduleBlock" DROP CONSTRAINT "ScheduleBlock_lashistId_fkey";

-- DropIndex
DROP INDEX "Booking_lashistId_date_startTime_idx";

-- DropIndex
DROP INDEX "BusinessHours_lashistId_day_idx";

-- DropIndex
DROP INDEX "BusinessHours_lashistId_day_key";

-- DropIndex
DROP INDEX "ScheduleBlock_lashistId_date_idx";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "lashistId",
ADD COLUMN     "workerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BusinessHours" DROP COLUMN "lashistId",
ADD COLUMN     "workerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OverrideHours" DROP COLUMN "lashistId",
ADD COLUMN     "workerId" TEXT;

-- AlterTable
ALTER TABLE "ScheduleBlock" DROP COLUMN "lashistId",
ADD COLUMN     "workerId" TEXT;

-- DropTable
DROP TABLE "Lashist";

-- DropTable
DROP TABLE "LashistCategory";

-- CreateTable
CREATE TABLE "Worker" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "bio" TEXT,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Worker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkerCategory" (
    "id" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "WorkerCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Worker_userId_key" ON "Worker"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkerCategory_workerId_categoryId_key" ON "WorkerCategory"("workerId", "categoryId");

-- CreateIndex
CREATE INDEX "Booking_workerId_date_startTime_idx" ON "Booking"("workerId", "date", "startTime");

-- CreateIndex
CREATE INDEX "BusinessHours_workerId_day_idx" ON "BusinessHours"("workerId", "day");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessHours_workerId_day_key" ON "BusinessHours"("workerId", "day");

-- CreateIndex
CREATE INDEX "ScheduleBlock_workerId_date_idx" ON "ScheduleBlock"("workerId", "date");

-- AddForeignKey
ALTER TABLE "Worker" ADD CONSTRAINT "Worker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkerCategory" ADD CONSTRAINT "WorkerCategory_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkerCategory" ADD CONSTRAINT "WorkerCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleBlock" ADD CONSTRAINT "ScheduleBlock_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessHours" ADD CONSTRAINT "BusinessHours_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OverrideHours" ADD CONSTRAINT "OverrideHours_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - The `isFeature` column on the `Service` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "isFeature",
ADD COLUMN     "isFeature" BOOLEAN;

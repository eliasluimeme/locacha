/*
  Warnings:

  - You are about to drop the column `location` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "location",
ADD COLUMN     "latitude" INTEGER,
ADD COLUMN     "longitude" INTEGER;

/*
  Warnings:

  - You are about to drop the column `dateOfBirth` on the `bloodRequests` table. All the data in the column will be lost.
  - Added the required column `donationDate` to the `bloodRequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donationTime` to the `bloodRequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `bloodRequests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bloodRequests" DROP COLUMN "dateOfBirth",
ADD COLUMN     "donationDate" TEXT NOT NULL,
ADD COLUMN     "donationTime" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL;

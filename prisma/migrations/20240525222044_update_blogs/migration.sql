/*
  Warnings:

  - You are about to drop the column `author` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `blogs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "author",
DROP COLUMN "category";

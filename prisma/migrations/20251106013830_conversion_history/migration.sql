/*
  Warnings:

  - You are about to drop the column `source` on the `conversion_history` table. All the data in the column will be lost.
  - You are about to drop the `favorite_currencies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "favorite_currencies" DROP CONSTRAINT "favorite_currencies_currencyId_fkey";

-- DropForeignKey
ALTER TABLE "favorite_currencies" DROP CONSTRAINT "favorite_currencies_userId_fkey";

-- AlterTable
ALTER TABLE "conversion_history" DROP COLUMN "source";

-- DropTable
DROP TABLE "favorite_currencies";

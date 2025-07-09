/*
  Warnings:

  - You are about to drop the column `idadmin` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "idadmin",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';

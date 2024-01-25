/*
  Warnings:

  - You are about to drop the column `creadorID` on the `Empresa` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Empresa" DROP CONSTRAINT "Empresa_creadorID_fkey";

-- DropIndex
DROP INDEX "Empresa_creadorID_key";

-- AlterTable
ALTER TABLE "Empresa" DROP COLUMN "creadorID";

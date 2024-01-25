/*
  Warnings:

  - Made the column `empresaID` on table `Usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_empresaID_fkey";

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "empresaID" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_empresaID_fkey" FOREIGN KEY ("empresaID") REFERENCES "Empresa"("empresaID") ON DELETE RESTRICT ON UPDATE CASCADE;

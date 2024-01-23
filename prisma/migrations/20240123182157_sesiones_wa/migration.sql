/*
  Warnings:

  - Added the required column `verificado` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "verificado" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "SesionWA" (
    "sesionWAID" INTEGER NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sessionID" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "empresaEmpresaID" INTEGER NOT NULL,
    "creadorID" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SesionWA_creadorID_key" ON "SesionWA"("creadorID");

-- AddForeignKey
ALTER TABLE "SesionWA" ADD CONSTRAINT "SesionWA_empresaEmpresaID_fkey" FOREIGN KEY ("empresaEmpresaID") REFERENCES "Empresa"("empresaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SesionWA" ADD CONSTRAINT "SesionWA_creadorID_fkey" FOREIGN KEY ("creadorID") REFERENCES "Usuario"("usuarioID") ON DELETE RESTRICT ON UPDATE CASCADE;

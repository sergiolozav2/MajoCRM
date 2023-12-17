/*
  Warnings:

  - You are about to drop the column `role` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `rolID` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('EMPRESARIO', 'COLABORADOR', 'ADMINISTRADOR', 'DEV');

-- CreateEnum
CREATE TYPE "TipoPermiso" AS ENUM ('MODULO_CHAT', 'MODULO_PRODUCTO', 'MODULO_COLABORADOR', 'MODULO_PUBLICIDAD', 'MODULO_CHATBOT', 'MODULO_CLIENTE', 'MODULO_EMPRESA', 'MODULO_OPCIONES');

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "role",
ADD COLUMN     "rolID" INTEGER NOT NULL,
ADD COLUMN     "tipo" "TipoUsuario" NOT NULL;

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Rol" (
    "rolID" SERIAL NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nombreRol" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL DEFAULT '',
    "creadorID" INTEGER NOT NULL,
    "empresaID" INTEGER NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("rolID")
);

-- CreateTable
CREATE TABLE "PermisoRol" (
    "rolID" INTEGER NOT NULL,
    "tipo" "TipoPermiso" NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PermisoRol_pkey" PRIMARY KEY ("rolID","tipo")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rol_creadorID_key" ON "Rol"("creadorID");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_rolID_fkey" FOREIGN KEY ("rolID") REFERENCES "Rol"("rolID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rol" ADD CONSTRAINT "Rol_creadorID_fkey" FOREIGN KEY ("creadorID") REFERENCES "Usuario"("usuarioID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rol" ADD CONSTRAINT "Rol_empresaID_fkey" FOREIGN KEY ("empresaID") REFERENCES "Empresa"("empresaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermisoRol" ADD CONSTRAINT "PermisoRol_rolID_fkey" FOREIGN KEY ("rolID") REFERENCES "Rol"("rolID") ON DELETE RESTRICT ON UPDATE CASCADE;

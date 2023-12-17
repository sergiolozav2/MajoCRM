/*
  Warnings:

  - Added the required column `correo` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "correo" TEXT NOT NULL;

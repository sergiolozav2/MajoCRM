-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_empresaID_fkey";

-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_rolID_fkey";

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "empresaID" DROP NOT NULL,
ALTER COLUMN "rolID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_empresaID_fkey" FOREIGN KEY ("empresaID") REFERENCES "Empresa"("empresaID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_rolID_fkey" FOREIGN KEY ("rolID") REFERENCES "Rol"("rolID") ON DELETE SET NULL ON UPDATE CASCADE;

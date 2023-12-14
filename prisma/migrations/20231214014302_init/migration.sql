-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "LicenciaPlan" AS ENUM ('DEMO', 'FREE', 'BASIC', 'PROFESSIONAL', 'ENTERPRISE', 'PERMANENT');

-- CreateEnum
CREATE TYPE "CanalContacto" AS ENUM ('WHATSAPP');

-- CreateEnum
CREATE TYPE "TipoMensaje" AS ENUM ('TEXTO', 'UBICACION', 'ENLACE', 'CONTACTO', 'ARCHIVO', 'IMAGEN', 'VIDEO', 'AUDIO', 'STICKER');

-- CreateTable
CREATE TABLE "Usuario" (
    "usuarioID" SERIAL NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "segundoApellido" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "empresaID" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("usuarioID")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "empresaID" SERIAL NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nombreEmpresa" TEXT NOT NULL,
    "creadorID" INTEGER NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("empresaID")
);

-- CreateTable
CREATE TABLE "Mensaje" (
    "mensajeID" SERIAL NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contenido" TEXT NOT NULL,
    "tipoMensaje" "TipoMensaje" NOT NULL,
    "clienteID" INTEGER NOT NULL,

    CONSTRAINT "Mensaje_pkey" PRIMARY KEY ("mensajeID")
);

-- CreateTable
CREATE TABLE "ClienteIdentidad" (
    "clienteIdentidadID" SERIAL NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "identificador" TEXT NOT NULL,

    CONSTRAINT "ClienteIdentidad_pkey" PRIMARY KEY ("clienteIdentidadID")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "clienteID" SERIAL NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nombreCliente" TEXT NOT NULL DEFAULT '',
    "canalContacto" "CanalContacto" NOT NULL DEFAULT 'WHATSAPP',
    "clienteIdentidadID" INTEGER NOT NULL,
    "empresaID" INTEGER NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("clienteID")
);

-- CreateTable
CREATE TABLE "EtiquetaClienteRelacion" (
    "clienteID" INTEGER NOT NULL,
    "etiquetaClienteID" INTEGER NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EtiquetaClienteRelacion_pkey" PRIMARY KEY ("clienteID","etiquetaClienteID")
);

-- CreateTable
CREATE TABLE "EtiquetaCliente" (
    "etiquetaClienteID" SERIAL NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creadorID" INTEGER NOT NULL,
    "empresaID" INTEGER NOT NULL,

    CONSTRAINT "EtiquetaCliente_pkey" PRIMARY KEY ("etiquetaClienteID")
);

-- CreateTable
CREATE TABLE "Item" (
    "itemID" SERIAL NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nombreItem" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "informacionExtra" JSONB,
    "creadorID" INTEGER NOT NULL,
    "empresaID" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("itemID")
);

-- CreateTable
CREATE TABLE "Tarea" (
    "tareaID" SERIAL NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nombreTarea" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL DEFAULT '',
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "clienteID" INTEGER NOT NULL,
    "creadorID" INTEGER NOT NULL,
    "asignadoID" INTEGER,

    CONSTRAINT "Tarea_pkey" PRIMARY KEY ("tareaID")
);

-- CreateTable
CREATE TABLE "EtiquetaMensajeImportante" (
    "etiquetaMensajeImportanteID" SERIAL NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nombreEtiqueta" TEXT NOT NULL,

    CONSTRAINT "EtiquetaMensajeImportante_pkey" PRIMARY KEY ("etiquetaMensajeImportanteID")
);

-- CreateTable
CREATE TABLE "MensajeImportante" (
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creadorID" INTEGER NOT NULL,
    "empresaID" INTEGER NOT NULL,
    "mensajeID" INTEGER NOT NULL,
    "etiquetaMensajeImportanteID" INTEGER,

    CONSTRAINT "MensajeImportante_pkey" PRIMARY KEY ("empresaID","mensajeID")
);

-- CreateTable
CREATE TABLE "Licencia" (
    "licenciaID" SERIAL NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "licenciaPlan" "LicenciaPlan" NOT NULL,
    "usuarioID" INTEGER NOT NULL,

    CONSTRAINT "Licencia_pkey" PRIMARY KEY ("licenciaID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_creadorID_key" ON "Empresa"("creadorID");

-- CreateIndex
CREATE UNIQUE INDEX "ClienteIdentidad_identificador_key" ON "ClienteIdentidad"("identificador");

-- CreateIndex
CREATE UNIQUE INDEX "Tarea_clienteID_key" ON "Tarea"("clienteID");

-- CreateIndex
CREATE UNIQUE INDEX "MensajeImportante_mensajeID_key" ON "MensajeImportante"("mensajeID");

-- CreateIndex
CREATE UNIQUE INDEX "Licencia_usuarioID_key" ON "Licencia"("usuarioID");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_empresaID_fkey" FOREIGN KEY ("empresaID") REFERENCES "Empresa"("empresaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_creadorID_fkey" FOREIGN KEY ("creadorID") REFERENCES "Usuario"("usuarioID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensaje" ADD CONSTRAINT "Mensaje_clienteID_fkey" FOREIGN KEY ("clienteID") REFERENCES "Cliente"("clienteID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_clienteIdentidadID_fkey" FOREIGN KEY ("clienteIdentidadID") REFERENCES "ClienteIdentidad"("clienteIdentidadID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_empresaID_fkey" FOREIGN KEY ("empresaID") REFERENCES "Empresa"("empresaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtiquetaClienteRelacion" ADD CONSTRAINT "EtiquetaClienteRelacion_clienteID_fkey" FOREIGN KEY ("clienteID") REFERENCES "Cliente"("clienteID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtiquetaClienteRelacion" ADD CONSTRAINT "EtiquetaClienteRelacion_etiquetaClienteID_fkey" FOREIGN KEY ("etiquetaClienteID") REFERENCES "EtiquetaCliente"("etiquetaClienteID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtiquetaCliente" ADD CONSTRAINT "EtiquetaCliente_creadorID_fkey" FOREIGN KEY ("creadorID") REFERENCES "Usuario"("usuarioID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtiquetaCliente" ADD CONSTRAINT "EtiquetaCliente_empresaID_fkey" FOREIGN KEY ("empresaID") REFERENCES "Empresa"("empresaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_creadorID_fkey" FOREIGN KEY ("creadorID") REFERENCES "Usuario"("usuarioID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_empresaID_fkey" FOREIGN KEY ("empresaID") REFERENCES "Empresa"("empresaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarea" ADD CONSTRAINT "Tarea_clienteID_fkey" FOREIGN KEY ("clienteID") REFERENCES "Cliente"("clienteID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarea" ADD CONSTRAINT "Tarea_creadorID_fkey" FOREIGN KEY ("creadorID") REFERENCES "Usuario"("usuarioID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarea" ADD CONSTRAINT "Tarea_asignadoID_fkey" FOREIGN KEY ("asignadoID") REFERENCES "Usuario"("usuarioID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MensajeImportante" ADD CONSTRAINT "MensajeImportante_creadorID_fkey" FOREIGN KEY ("creadorID") REFERENCES "Usuario"("usuarioID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MensajeImportante" ADD CONSTRAINT "MensajeImportante_empresaID_fkey" FOREIGN KEY ("empresaID") REFERENCES "Empresa"("empresaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MensajeImportante" ADD CONSTRAINT "MensajeImportante_mensajeID_fkey" FOREIGN KEY ("mensajeID") REFERENCES "Mensaje"("mensajeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MensajeImportante" ADD CONSTRAINT "MensajeImportante_etiquetaMensajeImportanteID_fkey" FOREIGN KEY ("etiquetaMensajeImportanteID") REFERENCES "EtiquetaMensajeImportante"("etiquetaMensajeImportanteID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Licencia" ADD CONSTRAINT "Licencia_usuarioID_fkey" FOREIGN KEY ("usuarioID") REFERENCES "Usuario"("usuarioID") ON DELETE RESTRICT ON UPDATE CASCADE;

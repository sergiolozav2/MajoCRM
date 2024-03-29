import { FastifyRequest } from 'fastify';
import { prisma } from '../../prisma';
import * as schemas from './schemas';
import { Static } from '@sinclair/typebox';

type crearClienteBody = Static<typeof schemas.crearCliente>;
type editarClienteBody = Static<typeof schemas.editarCliente>;

export async function obtenerTodosCliente(req: FastifyRequest) {
  const cliente = await prisma.cliente.findMany({
    where: {
      empresaID: req.user.empresaID,
    },
    include: {
      clienteIdentidad: true,
    },
  });
  return { list: cliente };
}

export async function crearCliente(
  req: FastifyRequest<{
    Body: crearClienteBody;
  }>,
) {
  const identificador = req.body.identificador;

  let clienteIdentidad = await prisma.clienteIdentidad.findFirst({
    where: {
      identificador,
    },
  });

  if (!clienteIdentidad) {
    clienteIdentidad = await prisma.clienteIdentidad.create({
      data: {
        identificador,
      },
    });
  }
  const cliente = await prisma.cliente.create({
    data: {
      clienteIdentidadID: clienteIdentidad.clienteIdentidadID,
      empresaID: req.user.empresaID,
      ...req.body.cliente,
    },
    include: {
      clienteIdentidad: true,
    },
  });
  return cliente;
}

export async function editarCliente(
  req: FastifyRequest<{
    Body: editarClienteBody;
  }>,
) {
  const identificador = req.body.identificador;
  let clienteIdentidadID: number | undefined;
  if (identificador) {
    let clienteIdentidad = await prisma.clienteIdentidad.findFirst({
      where: {
        identificador,
      },
    });

    if (!clienteIdentidad) {
      clienteIdentidad = await prisma.clienteIdentidad.create({
        data: {
          identificador,
        },
      });
    }
    clienteIdentidadID = clienteIdentidad.clienteIdentidadID;
  }
  const cliente = await prisma.cliente.update({
    where: {
      clienteID: req.body.clienteID,
    },
    data: {
      ...req.body.cliente,
      clienteIdentidadID,
    },
  });
  return cliente;
}

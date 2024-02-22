import { FastifyRequest } from 'fastify';
import { prisma } from '../../prisma';

export async function obtenerTodosCliente(req: FastifyRequest) {
  const cliente = await prisma.cliente.findMany({
    where: {
      empresaID: req.user.empresaID,
    },
  });
  return { list: cliente };
}

import { Static } from '@sinclair/typebox';
import { FastifyRequest } from 'fastify';
import { prisma } from '../../prisma';
import * as schemas from './schemas';

type crearItemBody = Static<typeof schemas.crearItem>;

export async function obtenerTodosItems(req: FastifyRequest) {
  const items = await prisma.item.findMany({
    where: {
      empresaID: req.user.empresaID,
    },
  });
  return items;
}

export async function crearItem(req: FastifyRequest<{ Body: crearItemBody }>) {
  const item = await prisma.item.create({
    data: {
      ...req.body,
      creadorID: req.user.usuarioID,
      empresaID: req.user.empresaID,
    },
  });
  return item;
}

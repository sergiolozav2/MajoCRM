import { Static } from '@sinclair/typebox';
import { FastifyRequest } from 'fastify';
import { prisma } from '../../prisma';
import * as schemas from './schemas';

type crearItemBody = Static<typeof schemas.crearItem>;
type editarItemBody = Static<typeof schemas.editarItem>;

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

export async function editarItem(
  req: FastifyRequest<{ Body: editarItemBody }>,
) {
  const item = await prisma.item.update({
    where: {
      itemID: req.body.itemID,
    },
    data: req.body.item,
  });
  return item;
}

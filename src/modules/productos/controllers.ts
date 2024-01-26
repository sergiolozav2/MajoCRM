import { Static } from '@sinclair/typebox';
import { FastifyRequest } from 'fastify';
import { prisma } from '../../prisma';
import * as schemas from './schemas';

type obtenerTodosItemsBody = Static<typeof schemas.obtenerItems>;

export async function obtenerTodosItems(
  req: FastifyRequest<{ Body: obtenerTodosItemsBody }>,
) {
  const items = await prisma.item.findMany({
    where: {
      empresaID: req.user.empresaID,
    },
  });
  return items;
}

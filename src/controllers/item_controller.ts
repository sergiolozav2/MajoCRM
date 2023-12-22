import { Static } from '@sinclair/typebox';
import { ItemSchemas } from '../schemas/item_schemas';
import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../prisma';

type obtenerTodosItemsBody = Static<typeof ItemSchemas.obtenerItems>;

export class ItemController {
  static async obtenerTodosItems(
    req: FastifyRequest<{ Body: obtenerTodosItemsBody }>,
    reply: FastifyReply,
  ) {
    const items = await prisma.item.findMany({
      where: {
        empresaID: req.body.empresaID,
      },
    });

    return items;
  }
}

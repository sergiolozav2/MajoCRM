import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import * as controllers from './controllers';
import * as schemas from './schemas';
import * as sharedSchemas from '../common/schemas';

export default function integrantesRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void,
) {
  fastify.get(
    '/',
    {
      onRequest: [fastify.autenticar],
      schema: {
        headers: sharedSchemas.tokenSchema,
      },
    },
    controllers.obtenerIntegrantes,
  );

  fastify.put(
    '/',
    {
      onRequest: [fastify.autenticar as never],
      schema: {
        body: schemas.editarIntegrante,
        headers: sharedSchemas.tokenSchema,
      },
    },
    controllers.editarIntegrante,
  );

  fastify.post(
    '/invitar_usuario',
    {
      onRequest: [fastify.autenticar as never],
      schema: {
        body: schemas.invitarIntegrante,
        headers: sharedSchemas.tokenSchema,
      },
    },
    controllers.crearIntegrante,
  );

  done();
}

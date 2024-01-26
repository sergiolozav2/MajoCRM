import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import * as controllers from './controllers';
import * as schemas from './schemas';
import * as sharedSchemas from '../../shared/schemas';

export default function integrantesRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void,
) {
  fastify.post(
    '/',
    {
      onRequest: [fastify.autenticar],
      schema: {
        tags: ['integrantes'],
        headers: sharedSchemas.tokenSchema,
      },
    },
    controllers.obtenerIntegrantes,
  );

  fastify.post(
    '/invitar_usuario',
    {
      onRequest: [fastify.autenticar as never],
      schema: {
        tags: ['integrantes'],
        body: schemas.invitarIntegrante,
        headers: sharedSchemas.tokenSchema,
      },
    },
    controllers.crearIntegrante,
  );

  done();
}

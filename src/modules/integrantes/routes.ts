import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import * as controllers from './controllers';
import * as schemas from './schemas';
import * as sharedSchemas from '../../shared/schemas';

const tags = ['integrantes'];

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
        tags,
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
        tags,
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
        tags,
        body: schemas.invitarIntegrante,
        headers: sharedSchemas.tokenSchema,
      },
    },
    controllers.crearIntegrante,
  );

  done();
}

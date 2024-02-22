import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import * as controllers from './controllers';
import * as sharedSchemas from '../common/schemas';

function itemRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void,
) {
  fastify.get(
    '/',
    {
      onRequest: [fastify.autenticar as never],
      schema: {
        headers: sharedSchemas.tokenSchema,
      },
    },
    controllers.obtenerTodosCliente,
  );
  done();
}

export default itemRoutes;

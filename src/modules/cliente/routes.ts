import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import * as controllers from './controllers';
import * as sharedSchemas from '../common/schemas';
import * as schemas from './schemas';

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
  fastify.post(
    '/',
    {
      onRequest: [fastify.autenticar as never],
      schema: {
        headers: sharedSchemas.tokenSchema,
        body: schemas.crearCliente,
      },
    },
    controllers.crearCliente,
  );
  done();
}

export default itemRoutes;

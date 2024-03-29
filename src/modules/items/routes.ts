import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import * as controllers from './controllers';
import * as schemas from './schemas';
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
    controllers.obtenerTodosItems,
  );

  fastify.post(
    '/',
    {
      onRequest: [fastify.autenticar as never],
      schema: {
        headers: sharedSchemas.tokenSchema,
        body: schemas.crearItem,
      },
    },
    controllers.crearItem,
  );

  fastify.put(
    '/',
    {
      onRequest: [fastify.autenticar as never],
      schema: {
        headers: sharedSchemas.tokenSchema,
        body: schemas.editarItem,
      },
    },
    controllers.crearItem,
  );

  done();
}

export default itemRoutes;

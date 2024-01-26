import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import * as controllers from './controllers';
import * as schemas from './schemas';
import * as sharedSchemas from '../../shared/schemas';

const tags = ['items'];

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
        tags,
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
        tags,
        headers: sharedSchemas.tokenSchema,
        body: schemas.crearItem,
      },
    },
    controllers.crearItem,
  );
  done();
}

export default itemRoutes;

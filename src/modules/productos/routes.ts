import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import * as controllers from './controllers';

const tags = ['items'];

function itemRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void,
) {
  fastify.post(
    '/',
    {
      onRequest: [fastify.autenticar as never],
      schema: {
        tags,
      },
    },
    controllers.obtenerTodosItems,
  );

  done();
}

export default itemRoutes;

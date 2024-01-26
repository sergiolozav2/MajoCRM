import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import * as controllers from './controllers';
import * as schemas from './schemas';

const tags = ['items'];

function itemRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void,
) {
  fastify.post(
    '/item',
    {
      schema: {
        tags,
        body: schemas.obtenerItems,
      },
    },
    controllers.obtenerTodosItems,
  );

  done();
}

export default itemRoutes;

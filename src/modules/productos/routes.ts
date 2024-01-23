import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { schemaPartial } from '../../utils/jsonSchemaBuilder';
import * as controllers from './controllers';
import * as schemas from './schemas';

const schema = schemaPartial({ tags: ['items'] });
function itemRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void,
) {
  fastify.post(
    '/item',
    schema({
      body: schemas.obtenerItems,
    }),
    controllers.obtenerTodosItems,
  );

  done();
}

export default itemRoutes;

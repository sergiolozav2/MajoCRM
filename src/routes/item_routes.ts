import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { schemaPartial } from '../utils/jsonSchemaBuilder';
import { ItemSchemas } from '../schemas';
import { ItemController } from '../controllers';

const schema = schemaPartial({ tags: ['items'] });
function itemRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void,
) {
  fastify.post(
    '/item',
    schema({
      body: ItemSchemas.obtenerItems,
    }),
    ItemController.obtenerTodosItems,
  );

  done();
}

export default itemRoutes;

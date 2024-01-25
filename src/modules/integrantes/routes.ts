import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { schemaPartial } from '../../utils/jsonSchemaBuilder';

import * as controllers from './controllers';
import * as schemas from './schemas';

const schema = schemaPartial({ tags: ['integrantes'] });

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
        headers: schemas.obtenerIntegrantes,
      },
    },
    controllers.obtenerIntegrantes,
  );

  fastify.post(
    '/invitar_usuario',
    schema({
      body: schemas.invitarIntegrante,
    }),
    controllers.crearIntegrante,
  );

  done();
}

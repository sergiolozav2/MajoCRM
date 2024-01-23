import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { schemaPartial } from '../../utils/jsonSchemaBuilder';
import * as schemas from './schemas';
import * as controllers from './controllers';

const schema = schemaPartial({ tags: ['sesionWA'] });
function sesionWARoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void,
) {
  fastify.get(
    '/sesion',
    {
      ...schema({
        querystring: schemas.crearSesion,
      }),
    },
    controllers.crearSesion,
  );

  fastify.post(
    '/enviar-mensaje',
    {
      ...schema({ body: schemas.enviarMensaje }),
    },
    controllers.enviarMensaje,
  );

  fastify.post(
    '/enviar-imagen',
    {
      ...schema({ body: schemas.enviarImagen }),
    },
    controllers.enviarImagen,
  );
  done();
}

export default sesionWARoutes;

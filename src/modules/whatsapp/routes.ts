import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import * as schemas from './schemas';
import * as controllers from './controllers';

const tags = ['sesionWa'];

function sesionWARoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void,
) {
  fastify.get(
    '/sesion',
    {
      schema: {
        tags,
        querystring: schemas.crearSesion,
      },
    },
    controllers.crearSesion,
  );

  fastify.post(
    '/enviar-mensaje',
    {
      schema: {
        tags,
        body: schemas.enviarMensaje,
      },
    },
    controllers.enviarMensaje,
  );

  fastify.post(
    '/enviar-imagen',
    {
      schema: {
        tags,
        body: schemas.enviarImagen,
      },
    },
    controllers.enviarImagen,
  );
  done();
}

export default sesionWARoutes;

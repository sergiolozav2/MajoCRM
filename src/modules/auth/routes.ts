import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import * as controllers from './controllers';
import * as schemas from './schemas';

const tags = ['auth'];

function usuarioRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void,
) {
  fastify.post(
    '/register',
    {
      schema: {
        tags,
        body: schemas.registrarUsuario,
      },
    },
    controllers.registrarUsuario,
  );
  fastify.post(
    '/login',
    {
      schema: {
        tags,
        body: schemas.iniciarSesion,
      },
    },
    controllers.iniciarSesion,
  );

  fastify.post(
    '/refreshToken',
    {
      schema: {
        tags,
        headers: schemas.autorizarToken,
      },
    },
    controllers.reiniciarToken,
  );

  done();
}

export default usuarioRoutes;

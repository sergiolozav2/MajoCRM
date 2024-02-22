import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import * as controllers from './controllers';
import * as schemas from './schemas';

function usuarioRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void,
) {
  fastify.post(
    '/register',
    {
      schema: {
        body: schemas.registrarUsuario,
      },
    },
    controllers.registrarUsuario,
  );
  fastify.post(
    '/login',
    {
      schema: {
        body: schemas.iniciarSesion,
      },
    },
    controllers.iniciarSesion,
  );

  fastify.post(
    '/refreshToken',
    {
      schema: {
        headers: schemas.autorizarToken,
      },
    },
    controllers.reiniciarToken,
  );

  done();
}

export default usuarioRoutes;

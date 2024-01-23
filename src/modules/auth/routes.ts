import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { schemaPartial } from '../../utils/jsonSchemaBuilder';
import * as controllers from './controllers';
import * as schemas from './schemas';

const schema = schemaPartial({ tags: ['auth'] });
function usuarioRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void,
) {
  fastify.post(
    '/register',
    schema({
      body: schemas.registrarUsuario,
    }),
    controllers.registrarUsuario,
  );
  fastify.post(
    '/login',
    schema({
      body: schemas.iniciarSesion,
    }),
    controllers.iniciarSesion,
  );

  fastify.post(
    '/refreshToken',
    schema({
      headers: schemas.autorizarToken,
    }),
    controllers.reiniciarToken,
  );

  done();
}

export default usuarioRoutes;

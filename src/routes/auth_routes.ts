import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { schemaPartial } from '../utils/jsonSchemaBuilder';
import { AuthSchemas } from '../schemas';
import { AuthController } from '../controllers/auth_controller';

const schema = schemaPartial({ tags: ['auth'] });
function usuarioRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void,
) {
  fastify.post(
    '/register',
    schema({
      body: AuthSchemas.registrarUsuario,
    }),
    AuthController.registrarUsuario,
  );

  done();
}

export default usuarioRoutes;

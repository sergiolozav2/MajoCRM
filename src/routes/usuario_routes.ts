import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { UsuarioController } from '../controllers';
import { schema } from '../utils/jsonSchemaBuilder';
import { UsuarioSchemas } from '../schemas';

function usuarioRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void,
) {
  fastify.get('/user/:id', UsuarioController.obtenerUsuario);

  fastify.post(
    '/user',
    schema({
      body: UsuarioSchemas.crearUsuario,
    }),
    UsuarioController.crearUsuario,
  );

  done();
}

export default usuarioRoutes;

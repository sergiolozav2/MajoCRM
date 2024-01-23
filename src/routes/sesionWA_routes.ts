import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { schemaPartial } from '../utils/jsonSchemaBuilder';
import { SesionWASchemas } from '../schemas';
import { SesionWAController } from '../controllers';

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
        querystring: SesionWASchemas.crearSesion,
      }),
    },
    SesionWAController.crearSesion,
  );

  fastify.post(
    '/enviar-mensaje',
    {
      ...schema({ body: SesionWASchemas.enviarMensaje }),
    },
    SesionWAController.enviarMensaje,
  );

  fastify.post(
    '/enviar-imagen',
    {
      ...schema({ body: SesionWASchemas.enviarImagen }),
    },
    SesionWAController.enviarImagen,
  );
  done();
}

export default sesionWARoutes;

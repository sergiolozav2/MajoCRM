import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import path from 'path';
import autoload from '@fastify/autoload';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyCors from '@fastify/cors';
import {
  swaggerOptions,
  swaggerUiOptions,
} from './plugins/swagger_plugin_config';
import {} from './types/index';
import { errorHandlerPlugin, jwtPlugin } from './plugins';

export const app = fastify({ logger: false });

app.register(fastifyCors, {});
app.register(fastifySwagger, swaggerOptions);
app.register(fastifySwaggerUi, swaggerUiOptions);
app.register(jwtPlugin);

app.register(autoload, {
  dir: path.join(__dirname, 'routes'),
  options: { prefix: '/api' },
});

app.register(errorHandlerPlugin);

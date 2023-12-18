import fastify, { FastifyHttpOptions, FastifyInstance } from 'fastify';
import path from 'path';
import autoload from '@fastify/autoload';
import { errorHandlerPlugin } from './plugins/error_handler_plugin';
import { PrismaClient } from '@prisma/client';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyCors from '@fastify/cors';
import {
  swaggerOptions,
  swaggerUiOptions,
} from './plugins/swagger_plugin_config';

export const app = fastify({ logger: false });

app.register(fastifyCors, {});
app.register(fastifySwagger, swaggerOptions);
app.register(fastifySwaggerUi, swaggerUiOptions);

app.register(autoload, {
  dir: path.join(__dirname, 'routes'),
  options: { prefix: '/api' },
});

app.register(errorHandlerPlugin);

import fastify from 'fastify';
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

export const prisma = new PrismaClient();

export const server = fastify();

server.register(fastifyCors, {});
server.register(fastifySwagger, swaggerOptions);
server.register(fastifySwaggerUi, swaggerUiOptions);

server.register(autoload, {
  dir: path.join(__dirname, 'routes'),
  options: { prefix: '/api' },
});

server.register(errorHandlerPlugin);

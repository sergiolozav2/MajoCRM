import fastify from 'fastify';
import path from 'path';
import autoload from '@fastify/autoload';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyCors from '@fastify/cors';
import { swaggerOptions, swaggerUiOptions } from './services/swagger_config';
import {} from './types/index';
import { setErrorHandlerPlugin } from './plugins';
import FastifySSEPlugin from 'fastify-sse-v2';
import { jwtPlugin } from './plugins/jwt/plugin';

export const app = fastify({ logger: true });

app.register(fastifyCors, {});
app.register(fastifySwagger, swaggerOptions);
app.register(fastifySwaggerUi, swaggerUiOptions);
app.register(FastifySSEPlugin);
app.register(jwtPlugin);

app.register(autoload, {
  dir: path.join(__dirname, 'modules'),
  options: { prefix: '/api' },
  matchFilter: (path) => path.includes('routes'),
});

setErrorHandlerPlugin(app);

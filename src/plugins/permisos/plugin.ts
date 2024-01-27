import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';
import dotenv from 'dotenv';
import { permitirSegunTipoYRol } from './permitir';

dotenv.config();

function permisosPlugin_(
  server: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void,
) {
  server.decorate('permitir', permitirSegunTipoYRol);

  done();
}

export const permisosPlugin = fp(permisosPlugin_);

import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fp from 'fastify-plugin';
import dotenv from 'dotenv';
import {
  autenticarWrapper,
  crearRefreshToken,
  crearToken,
  decodificar,
  secret_jwt,
} from './jwt';

dotenv.config();

function jwtPlugin_(
  server: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void,
) {
  server.register(fastifyJwt, {
    secret: secret_jwt,
  });

  server.decorate('crearToken', (payload) => crearToken(server, payload));
  server.decorate('crearRefreshToken', (payload) =>
    crearRefreshToken(server, payload),
  );

  server.decorate('decodificar', (token) => decodificar(server, token));

  server.decorate('autenticar', autenticarWrapper(server));

  done();
}

export const jwtPlugin = fp(jwtPlugin_);

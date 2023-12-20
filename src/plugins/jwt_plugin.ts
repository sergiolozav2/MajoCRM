import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { CustomError } from '../errors/custom_error';
import { STATUS_CODES } from 'http';
import fastifyJwt from '@fastify/jwt';
import { RefreshTokenType } from '../types';
import fp from 'fastify-plugin';

require('dotenv').config();

function jwtPlugin_(
  server: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void,
) {
  const tokenDuracion = '15min';
  const refreshTokenDuracion = '24h';

  const token = process.env.SECRET_JWT;
  if (!token) {
    throw Error('SECRET_JWT no encontrado en .env');
  }

  server.register(fastifyJwt, {
    secret: token,
  });

  server.decorate('crearToken', (usuarioID) => {
    const jwtContenido = { usuarioID, type: 'jwt' };
    const token = server.jwt.sign(jwtContenido, {
      expiresIn: tokenDuracion,
    });
    return token;
  });

  server.decorate('crearRefreshToken', (usuarioID) => {
    const jwtContenido = { usuarioID, type: 'refresh' };
    const token = server.jwt.sign(jwtContenido, {
      expiresIn: refreshTokenDuracion,
    });
    return token;
  });

  server.decorate('decodificar', async (token) => {
    const decoded = server.jwt.verify(token);
    return decoded as RefreshTokenType;
  });
  done();
}

export const jwtPlugin = fp(jwtPlugin_);

import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ErrorTokenInvalido } from '../errors/custom_error';
import fastifyJwt from '@fastify/jwt';
import { TokenPayload } from '../types';
import fp from 'fastify-plugin';
import dotenv from 'dotenv';

dotenv.config();

function jwtPlugin_(
  server: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void,
) {
  const tokenDuracion = '15min';
  const refreshTokenDuracion = '24h';

  const secret_jwt = process.env.SECRET_JWT;
  if (!secret_jwt) {
    throw Error('SECRET_JWT no encontrado en .env');
  }

  server.register(fastifyJwt, {
    secret: secret_jwt,
  });

  server.decorate('crearToken', (payload: TokenPayload) => {
    payload.type = 'jwt';
    const token = server.jwt.sign(payload, {
      expiresIn: tokenDuracion,
    });
    return token;
  });

  server.decorate('crearRefreshToken', (payload: TokenPayload) => {
    payload.type = 'refresh';
    const token = server.jwt.sign(payload, {
      expiresIn: refreshTokenDuracion,
    });
    return token;
  });

  server.decorate('decodificar', async (token) => {
    const decoded = server.jwt.verify<TokenPayload>(token);
    return decoded;
  });

  server.decorate('autenticar', (req, reply, done) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new ErrorTokenInvalido();
    }
    req.user = server.jwt.verify(token);
    done();
  });
  done();
}

export const jwtPlugin = fp(jwtPlugin_);

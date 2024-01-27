import dotenv from 'dotenv';
import { TokenPayload } from '../../types';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ErrorTokenInvalido } from '../../errors';

dotenv.config();

const tokenDuracion = '15min';
const refreshTokenDuracion = '24h';

const env_jwt = process.env.SECRET_JWT;
if (!env_jwt) {
  throw Error('SECRET_JWT no encontrado en .env');
}
export const secret_jwt = env_jwt;

export function crearToken(server: FastifyInstance, payload: TokenPayload) {
  payload.type = 'jwt';
  const token = server.jwt.sign(payload, {
    expiresIn: tokenDuracion,
  });
  return token;
}

export function crearRefreshToken(
  server: FastifyInstance,
  payload: TokenPayload,
) {
  payload.type = 'refresh';
  const token = server.jwt.sign(payload, {
    expiresIn: refreshTokenDuracion,
  });
  return token;
}

export async function decodificar(server: FastifyInstance, token: string) {
  const decoded = server.jwt.verify<TokenPayload>(token);
  return decoded;
}

export function autenticarWrapper(server: FastifyInstance) {
  function autenticar(
    req: FastifyRequest,
    reply: FastifyReply,
    done: () => void,
  ) {
    const token = req.headers.authorization;
    if (!token) {
      throw new ErrorTokenInvalido();
    }

    req.user = server.jwt.verify(token);
    done();
  }
  return autenticar;
}

import { permitirFunctionType } from '../plugins/permisos';

declare module 'fastify' {
  interface FastifyInstance {
    crearToken: (payload: TokenPayload) => string;
    crearRefreshToken: (payload: TokenPayload) => string;
    decodificar: (token: string) => Promise<TokenPayload>;
    autenticar: (
      req: FastifyRequest,
      reply: FastifyReply,
      done: () => void,
    ) => void;
    permitir: permitirFunctionType;
  }
}

export type TokenPayload = {
  usuarioID: number;
  empresaID: number;
  type?: 'jwt' | 'refresh';
};
declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: TokenPayload;
  }
}

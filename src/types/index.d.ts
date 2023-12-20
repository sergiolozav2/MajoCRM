import fastify from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    crearToken: (usuarioID: number) => string;
    crearRefreshToken: (usuarioID: number) => string;
    decodificar: (token: string) => Promise<RefreshTokenType>;
  }
}

export type RefreshTokenType = {
  usuarioID: number;
  type: 'jwt' | 'refresh';
  iat: number;
  exp: number;
};

import fastify, {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import { ErrorTokenInvalido } from '../errors';

export function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    return request.jwtVerify();
  } catch (error) {
    throw new ErrorTokenInvalido();
  }
}

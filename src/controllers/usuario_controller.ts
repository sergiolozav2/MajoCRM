import { Static } from '@sinclair/typebox';
import { FastifyReply, FastifyRequest } from 'fastify';
import { UsuarioSchemas } from '../schemas';

interface obtenerUsuarioParamsType {
  id: string;
}

type crearUsuarioBody = Static<typeof UsuarioSchemas.crearUsuario>;

export class UsuarioController {
  static async obtenerUsuario(
    request: FastifyRequest<{ Params: obtenerUsuarioParamsType }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params;
    return { hola: 'HOLA', id: id };
  }

  static async crearUsuario(
    request: FastifyRequest<{ Body: crearUsuarioBody }>,
    reply: FastifyReply,
  ) {
    const { email, name } = request.body;
    return { hola: 'CREADO', id: 2 };
  }
}

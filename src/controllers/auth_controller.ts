import { Static } from '@sinclair/typebox';
import { FastifyReply, FastifyRequest } from 'fastify';
import { TipoUsuario } from '@prisma/client';
import { AuthSchemas } from '../schemas';
import { prisma } from '../prisma';
import { AuthServices } from '../services';

type registrarUsuarioBody = Static<typeof AuthSchemas.registrarUsuario>;

export class AuthController {
  static async registrarUsuario(
    req: FastifyRequest<{ Body: registrarUsuarioBody }>,
    reply: FastifyReply,
  ) {
    const { password } = req.body.usuario;
    const hashedPassword = await AuthServices.hashPassword(password);
    const usuario = prisma.usuario.create({
      data: {
        ...req.body.usuario,
        password: hashedPassword,
        tipo: TipoUsuario.EMPRESARIO,
        empresaCreada: {
          create: req.body.empresa,
        },
      },
    });
    return usuario;
  }
}

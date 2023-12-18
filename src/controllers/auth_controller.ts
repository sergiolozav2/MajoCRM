import { Static } from '@sinclair/typebox';
import { FastifyReply, FastifyRequest } from 'fastify';
import { TipoUsuario } from '@prisma/client';
import { AuthSchemas } from '../schemas';
import { prisma } from '../prisma';
import { AuthServices } from '../services';
import { ErrorLoginInvalido } from '../errors';

type registrarUsuarioBody = Static<typeof AuthSchemas.registrarUsuario>;
type iniciarSesionBody = Static<typeof AuthSchemas.iniciarSesion>;

export class AuthController {
  static async registrarUsuario(
    req: FastifyRequest<{ Body: registrarUsuarioBody }>,
    reply: FastifyReply,
  ) {
    const { password } = req.body.usuario;
    const hashedPassword = await AuthServices.hashPassword(password);
    const usuario = await prisma.usuario.create({
      data: {
        ...req.body.usuario,
        password: hashedPassword,
        tipo: TipoUsuario.EMPRESARIO,
        empresaCreada: {
          create: req.body.empresa,
        },
      },
    });

    const usuarioInfo = await prisma.usuario.findFirst({
      where: {
        usuarioID: usuario.usuarioID,
      },
      select: {
        usuarioID: true,
        telefono: true,
        nombre: true,
        apellido: true,
        correo: true,
        licencia: true,
        tipo: true,
        rol: true,
        empresaCreada: true,
      },
    });
    return usuarioInfo;
  }

  static async iniciarSesion(
    req: FastifyRequest<{ Body: iniciarSesionBody }>,
    reply: FastifyReply,
  ) {
    const usuario = await prisma.usuario.findFirst({
      where: {
        correo: req.body.email,
      },
      select: {
        usuarioID: true,
        password: true,
      },
    });

    if (usuario === null) {
      throw new ErrorLoginInvalido();
    }
    const password = req.body.password;
    const hashed = usuario.password;
    const iguales = await AuthServices.passwordEqual(password, hashed);
    if (!iguales) {
      throw new ErrorLoginInvalido();
    }
    const usuarioInfo = await prisma.usuario.findFirst({
      where: {
        usuarioID: usuario.usuarioID,
      },
      select: {
        usuarioID: true,
        nombre: true,
        correo: true,
        empresaCreada: true,
        tipo: true,
        telefono: true,
      },
    });

    return usuarioInfo;
  }
}

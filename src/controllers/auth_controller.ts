import { Static } from '@sinclair/typebox';
import { FastifyReply, FastifyRequest } from 'fastify';
import { TipoUsuario } from '@prisma/client';
import { AuthSchemas } from '../schemas';
import { prisma } from '../prisma';
import { AuthServices } from '../services';
import { ErrorLoginInvalido, ErrorTokenInvalido } from '../errors';

type registrarUsuarioBody = Static<typeof AuthSchemas.registrarUsuario>;
type iniciarSesionBody = Static<typeof AuthSchemas.iniciarSesion>;
type autorizarTokenHeader = Static<typeof AuthSchemas.autorizarToken>;

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
    const usuarioVerificar = await prisma.usuario.findFirst({
      where: {
        correo: req.body.email,
      },
      select: {
        usuarioID: true,
        password: true,
      },
    });

    if (usuarioVerificar === null) {
      throw new ErrorLoginInvalido();
    }
    const password = req.body.password;
    const hashed = usuarioVerificar.password;
    const iguales = await AuthServices.passwordEqual(password, hashed);
    if (!iguales) {
      throw new ErrorLoginInvalido();
    }

    const usuario = await prisma.usuario.findFirstOrThrow({
      where: {
        usuarioID: usuarioVerificar.usuarioID,
      },
      select: {
        usuarioID: true,
        nombre: true,
        correo: true,
        empresaCreada: true,
        tipo: true,
        telefono: true,
        licencia: true,
        rol: true,
      },
    });

    const token = req.server.crearToken(usuario.usuarioID);
    const refreshToken = req.server.crearRefreshToken(usuario.usuarioID);
    return { usuario, token, refreshToken };
  }

  static async reiniciarToken(
    req: FastifyRequest<{ Headers: autorizarTokenHeader }>,
    reply: FastifyReply,
  ) {
    const tokenString = req.headers.authorization;
    const token = await req.server.decodificar(tokenString);
    if (token.type === 'refresh') {
      const refreshToken = req.server.crearRefreshToken(5);
      return { refreshToken };
    }
    throw new ErrorTokenInvalido();
  }
}

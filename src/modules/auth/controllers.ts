import { type Static } from '@sinclair/typebox';
import { type FastifyReply, type FastifyRequest } from 'fastify';
import { TipoUsuario } from '@prisma/client';
import { prisma } from '../../prisma';
import { AuthServices } from '../../services';
import { ErrorLoginInvalido, ErrorTokenInvalido } from '../../errors';
import * as schemas from "./schemas"

type registrarUsuarioBody = Static<typeof schemas.registrarUsuario>;
type iniciarSesionBody = Static<typeof schemas.iniciarSesion>;
type autorizarTokenHeader = Static<typeof schemas.autorizarToken>;

export async function registrarUsuario(
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

export async function iniciarSesion(
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

export async function reiniciarToken(
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

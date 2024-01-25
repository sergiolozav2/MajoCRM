import { type Static } from '@sinclair/typebox';
import { type FastifyRequest } from 'fastify';
import { TipoUsuario } from '@prisma/client';
import { prisma } from '../../prisma';
import { AuthServices } from '../../services';
import { ErrorLoginInvalido, ErrorTokenInvalido } from '../../errors';
import * as schemas from './schemas';

type registrarUsuarioBody = Static<typeof schemas.registrarUsuario>;
type iniciarSesionBody = Static<typeof schemas.iniciarSesion>;
type autorizarTokenHeader = Static<typeof schemas.autorizarToken>;

export async function registrarUsuario(
  req: FastifyRequest<{ Body: registrarUsuarioBody }>,
) {
  const { password } = req.body.usuario;
  const hashedPassword = await AuthServices.hashPassword(password);
  const usuario = prisma.usuario.create({
    data: {
      ...req.body.usuario,
      password: hashedPassword,
      tipo: TipoUsuario.EMPRESARIO,
      empresa: {
        create: req.body.empresa,
      },
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
      empresa: true,
    },
  });
  return usuario;
}

export async function iniciarSesion(
  req: FastifyRequest<{ Body: iniciarSesionBody }>,
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
      empresa: true,
      tipo: true,
      telefono: true,
      licencia: true,
      rol: true,
    },
  });

  const payload = {
    usuarioID: usuario.usuarioID,
    empresaID: usuario.empresa.empresaID,
  };
  const token = req.server.crearToken(payload);
  const refreshToken = req.server.crearRefreshToken(payload);
  return { usuario, token, refreshToken };
}

export async function reiniciarToken(
  req: FastifyRequest<{ Headers: autorizarTokenHeader }>,
) {
  const tokenString = req.headers.authorization;
  const token = await req.server.decodificar(tokenString);
  if (token.type === 'refresh') {
    const refreshToken = req.server.crearRefreshToken(token);
    return { refreshToken };
  }
  throw new ErrorTokenInvalido();
}

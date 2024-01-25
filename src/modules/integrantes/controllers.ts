import { Static } from '@sinclair/typebox';
import { FastifyRequest } from 'fastify';
import * as schemas from './schemas';
import { prisma } from '../../prisma';
import { TipoUsuario } from '@prisma/client';
import { enviarEmailInvitacion } from './services/email_invitacion';
import { AuthServices } from '../../services';

type crearIntegranteBody = Static<typeof schemas.invitarIntegrante>;
export async function crearIntegrante(
  req: FastifyRequest<{ Body: crearIntegranteBody }>,
) {
  const hashed = await AuthServices.hashPassword(req.body.usuario.password);
  const usuario = await prisma.usuario.create({
    data: {
      ...req.body.usuario,
      tipo: TipoUsuario.COLABORADOR,
      password: hashed,
      empresa: {
        connect: {
          empresaID: req.body.empresaID,
        },
      },
    },
  });

  const enlaceVerificacion = 'verificar';
  const emailResult = enviarEmailInvitacion(usuario.correo, enlaceVerificacion);

  return emailResult;
}

export function obtenerIntegrantes(req: FastifyRequest) {
  const integrantes = prisma.usuario.findMany({
    where: {
      usuarioID: req.user.usuarioID,
    },
    include: {
      rol: true,
    },
  });
  return integrantes;
}

import { TipoPermiso, TipoUsuario } from '@prisma/client';
import { FastifyRequest } from 'fastify';
import { prisma } from '../../prisma';
import { ErrorPermisoInsuficiente, ErrorRolInsuficiente } from '../../errors';

export function permitirSegunTipoYRol(
  tiposRequeridos: TipoUsuario[],
  permisosRequeridos: TipoPermiso[],
) {
  return async (
    req: FastifyRequest,
    reply: FastifyRequest,
    done: () => void,
  ) => {
    const usuario = await prisma.usuario.findFirstOrThrow({
      where: {
        usuarioID: req.user.usuarioID,
      },
      select: {
        tipo: true,
        rol: {
          include: {
            permisos: {
              select: {
                tipo: true,
              },
            },
          },
        },
      },
    });

    // El administrador puede hacer todo por defecto
    if (usuario.tipo === 'ADMINISTRADOR') {
      done();
      return;
    }

    if (!esTipoPermitido(usuario.tipo, tiposRequeridos)) {
      throw new ErrorPermisoInsuficiente();
    }

    const permisosNested = usuario.rol?.permisos ?? [];
    const permisosUsuario = permisosNested.map((p) => p.tipo);

    if (!esRolPermitido(permisosUsuario, permisosRequeridos)) {
      throw new ErrorRolInsuficiente();
    }

    done();
    return;
  };
}

function esTipoPermitido(tipoUsuario: TipoUsuario, permitidos: TipoUsuario[]) {
  return permitidos.includes(tipoUsuario);
}

function esRolPermitido(
  permisosUsuario: TipoPermiso[],
  permitidos: TipoPermiso[],
) {
  let tieneTodos = true;
  for (const permiso of permisosUsuario) {
    tieneTodos = !permitidos.includes(permiso);
  }

  return tieneTodos;
}

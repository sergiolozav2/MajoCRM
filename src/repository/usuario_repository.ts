import { Usuario } from '@prisma/client';
import { prisma } from '../prisma';

export class UsuarioRepository {
  obtener(usuarioID: number) {
    const usuario = prisma.usuario.findFirst({
      where: {
        usuarioID: usuarioID,
      },
    });
    return usuario;
  }

  crear(data: Usuario) {
    const usuario = prisma.usuario.create({
      data: data,
    });
    return usuario;
  }

  editar(data: Usuario) {
    const usuario = prisma.usuario.update({
      data: data,
      where: {
        usuarioID: data.usuarioID,
      },
    });
    return usuario;
  }
}

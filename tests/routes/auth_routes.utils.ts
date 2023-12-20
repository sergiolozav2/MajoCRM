import { prisma } from '../../src/prisma';

export const validUserRegisterPayload = {
  usuario: {
    nombre: 'pedro',
    apellido: 'juan',
    segundoApellido: 'lopez',
    correo: 'lopez@example.com',
    telefono: '1234234',
    password: 'password',
  },
  empresa: {
    nombreEmpresa: 'empresacorp',
  },
};

export async function borrarUsuario(usuarioID: number) {
  await prisma.empresa.delete({
    where: {
      creadorID: usuarioID,
    },
  });
  await prisma.usuario.delete({
    where: {
      usuarioID: usuarioID,
    },
  });
}

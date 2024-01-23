import { Type } from '@sinclair/typebox';

export const registrarUsuario = Type.Object({
  usuario: Type.Object({
    nombre: Type.String(),
    apellido: Type.String(),
    segundoApellido: Type.String(),
    correo: Type.String({ format: 'email' }),
    telefono: Type.String(),
    password: Type.String(),
  }),
  empresa: Type.Object({
    nombreEmpresa: Type.String(),
  }),
});

export const iniciarSesion = Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String(),
});

export const autorizarToken = Type.Object({
  authorization: Type.String(),
});

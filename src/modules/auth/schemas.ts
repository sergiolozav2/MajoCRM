import { Type } from '@sinclair/typebox';
import { usuarioSchema } from '../common/schemas';

export const registrarUsuario = Type.Object({
  usuario: usuarioSchema,
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

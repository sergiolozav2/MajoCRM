import { Type } from '@sinclair/typebox';

export const usuarioSchema = Type.Object({
  nombre: Type.String(),
  apellido: Type.String(),
  segundoApellido: Type.String(),
  correo: Type.String({ format: 'email' }),
  telefono: Type.String(),
  password: Type.String(),
  verificado: Type.Boolean({default: false})
});

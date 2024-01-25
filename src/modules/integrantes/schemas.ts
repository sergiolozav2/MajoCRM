import { Type } from '@sinclair/typebox';
import { usuarioSchema } from '../../shared/schemas';

export const invitarIntegrante = Type.Object({
  usuario: usuarioSchema,
  empresaID: Type.Integer({ minimum: 1 }),
});

export const obtenerIntegrantes = Type.Object({
  authorization: Type.String(),
});

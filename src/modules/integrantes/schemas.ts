import { Type } from '@sinclair/typebox';
import { usuarioSchema } from '../../shared/schemas';

export const invitarIntegrante = Type.Object({
  usuario: usuarioSchema,
});

export const editarIntegrante = Type.Object({
  usuario: Type.Partial(usuarioSchema),
  usuarioID: Type.Number(),
});

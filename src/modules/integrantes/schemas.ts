import { Type } from '@sinclair/typebox';
import { usuarioSchema } from '../../shared/schemas';

export const invitarIntegrante = Type.Object({
  usuario: usuarioSchema,
});

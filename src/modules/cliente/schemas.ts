import { Type } from '@sinclair/typebox';

export const crearCliente = Type.Object({
  identificador: Type.String(),
  cliente: Type.Object({
    nombreCliente: Type.String(),
  }),
});

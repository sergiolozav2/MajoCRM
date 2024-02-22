import { Type } from '@sinclair/typebox';

export const crearCliente = Type.Object({
  identificador: Type.String(),
  cliente: Type.Object({
    nombreCliente: Type.String(),
  }),
});

export const editarCliente = Type.Object({
  clienteID: Type.Integer(),
  identificador: Type.Optional(Type.String()),
  cliente: Type.Optional(
    Type.Object({
      nombreCliente: Type.String(),
    }),
  ),
});

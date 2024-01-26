import { Type } from '@sinclair/typebox';

export const obtenerItems = Type.Object({
  empresaID: Type.Number(),
});

export const crearItem = Type.Object({
  nombreItem: Type.String(),
  descripcion: Type.String(),
  precio: Type.Number(),
});

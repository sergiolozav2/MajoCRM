import { Type } from '@sinclair/typebox';

export class ItemSchemas {
  static obtenerItems = Type.Object({
    empresaID: Type.Number(),
  });
}

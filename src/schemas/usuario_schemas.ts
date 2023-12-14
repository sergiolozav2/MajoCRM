import { Type } from "@sinclair/typebox";

export class UsuarioSchemas {
  static crearUsuario = Type.Object({
    name: Type.String(),
    email: Type.String({format: "email"}),
  });
}

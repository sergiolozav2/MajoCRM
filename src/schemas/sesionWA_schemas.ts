import { Type } from '@sinclair/typebox';

export class SesionWASchemas {
  static crearSesion = Type.Object({
    sesionID: Type.String(),
  });

  static enviarMensaje = Type.Object({
    sesionID: Type.String(),
    mensaje: Type.String(),
    telefono: Type.String(),
  });

  static enviarImagen = Type.Object({
    sesionID: Type.String(),
    telefono: Type.String(),
    url: Type.String(),
  });
}

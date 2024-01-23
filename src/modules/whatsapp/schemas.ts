import { Type } from '@sinclair/typebox';

export const crearSesion = Type.Object({
  sesionID: Type.String(),
});

export const enviarMensaje = Type.Object({
  sesionID: Type.String(),
  mensaje: Type.String(),
  telefono: Type.String(),
});

export const enviarImagen = Type.Object({
  sesionID: Type.String(),
  telefono: Type.String(),
  url: Type.String(),
});

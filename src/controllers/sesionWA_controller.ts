import { Static } from '@sinclair/typebox';
import { FastifyReply, FastifyRequest } from 'fastify';
import { SesionWASchemas } from '../schemas';
import { createSession } from '../utils/baileys_wa/create_sessions/create_sessions';
import { sendMessageWA } from '../utils/baileys_wa/sendMessages';

type crearSesionHeaders = Static<typeof SesionWASchemas.crearSesion>;
type enviarMensajeBody = Static<typeof SesionWASchemas.enviarMensaje>;
type enviarImagenBody = Static<typeof SesionWASchemas.enviarImagen>;

function sseData(event: string, data: unknown) {
  return JSON.stringify({ event, data });
}
export class SesionWAController {
  static async crearSesion(
    req: FastifyRequest<{ Querystring: crearSesionHeaders }>,
    reply: FastifyReply,
  ) {
    reply.sse({ data: sseData('waiting', '') });

    createSession(req.query.sesionID, {
      onLoadedQR(qr) {
        reply.sse({ data: sseData('qr', qr) });
      },
      onScannedQR() {
        reply.sse({ data: sseData('scanned', 'fin') });
        reply.sseContext.source.end();
      },
      onError(message) {
        reply.sse({ data: sseData('error', message.toString()) });
        reply.sseContext.source.end();
      },
    });
  }

  static async enviarMensaje(
    req: FastifyRequest<{ Body: enviarMensajeBody }>,
    reply: FastifyReply,
  ) {
    sendMessageWA({ ...req.body, type: 'text' });
    return { success: 'intente enviar' };
  }

  static async enviarImagen(
    req: FastifyRequest<{ Body: enviarImagenBody }>,
    reply: FastifyReply,
  ) {
    sendMessageWA({ ...req.body, type: 'image' });
    return { success: 'intente enviar' };
  }
}

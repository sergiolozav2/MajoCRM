import { Static } from '@sinclair/typebox';
import { FastifyReply, FastifyRequest } from 'fastify';
import { createSession } from '../../utils/baileys_wa/create_sessions/create_sessions';
import { sendMessageWA } from '../../utils/baileys_wa/sendMessages';
import * as schemas from './schemas';

type crearSesionHeaders = Static<typeof schemas.crearSesion>;
type enviarMensajeBody = Static<typeof schemas.enviarMensaje>;
type enviarImagenBody = Static<typeof schemas.enviarImagen>;

function sseData(event: string, data: unknown) {
  return JSON.stringify({ event, data });
}
export async function crearSesion(
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

export async function enviarMensaje(
  req: FastifyRequest<{ Body: enviarMensajeBody }>,
  reply: FastifyReply,
) {
  sendMessageWA({ ...req.body, type: 'text' });
  return { success: 'intente enviar' };
}

export async function enviarImagen(
  req: FastifyRequest<{ Body: enviarImagenBody }>,
  reply: FastifyReply,
) {
  sendMessageWA({ ...req.body, type: 'image' });
  return { success: 'intente enviar' };
}

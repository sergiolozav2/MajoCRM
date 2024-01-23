import { ConnectionState, DisconnectReason } from '@whiskeysockets/baileys';
import { toDataURL } from 'qrcode';
import { BaileysCallbacks } from '../types';
import { Boom } from '@hapi/boom';
import { endConnection } from './end_connection';

export async function handleConnectionUpdate(
  update: Partial<ConnectionState>,
  callbacks: BaileysCallbacks,
) {
  const { connection } = update;

  const onError = (error: any) => callbacks.onError(error);
  if (connection === 'open') {
    handleConnectionOpen(callbacks.onScannedQR).catch(onError);
  }
  if (connection === 'close') {
    handleConnectionClosed(update, callbacks.onError);
  }

  handleConnectionQR(update, callbacks.onLoadedQR).catch(onError);
}

export async function handleConnectionClosed(
  update: Partial<ConnectionState>,
  onError: (message: string) => void,
) {
  const code = (update.lastDisconnect?.error as Boom)?.output?.statusCode;
  const restartRequired = code === DisconnectReason.restartRequired;
  if (restartRequired) {
    throw new Error('reconnect');
  }
  onError(code.toString());
}

export async function handleConnectionOpen(onScannedQR: () => void) {
  onScannedQR();
}

export async function handleConnectionQR(
  update: Partial<ConnectionState>,
  onLoadedQR: (qr: string) => void,
) {
  const rawQR = update.qr;
  if (rawQR?.length) {
    const qr = await toDataURL(rawQR);
    onLoadedQR(qr);
  }
}

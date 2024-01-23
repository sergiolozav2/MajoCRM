import makeWASocket, {
  Browsers,
  useMultiFileAuthState,
} from '@whiskeysockets/baileys';
import { handleConnectionUpdate } from './handle_connection_updates';
import { BaileysCallbacks } from '../types';
import { endConnection } from './end_connection';
import { activeSessions } from './active_sessions';

export async function createSession(
  sessionID: string,
  callbacks: BaileysCallbacks,
  reconnectRequired: boolean = false,
) {
  const { state, saveCreds } = await useMultiFileAuthState(
    `bailey-${sessionID}`,
  );

  if (state.creds.account && !reconnectRequired) {
    callbacks.onError('Ya existe una cuenta');
    return;
  }

  const socket = makeWASocket({
    printQRInTerminal: true,
    browser: Browsers.ubuntu('Chrome'),
    generateHighQualityLinkPreview: true,
    auth: state,
  });

  // ESTA LINEA ES IMPORTANTE PARA ENVÍAR MENSAJES
  activeSessions[sessionID] = socket;

  function restartRequired() {
    createSession(sessionID, callbacks, true);
  }
  socket.ev.on('creds.update', saveCreds);
  socket.ev.on('connection.update', (update) => {
    handleConnectionUpdate(update, callbacks).catch((error) => {
      const message = error?.message.toString();
      if (message === 'reconnect') {
        restartRequired();
      } else {
        endConnection(socket);
      }
    });
  });
}

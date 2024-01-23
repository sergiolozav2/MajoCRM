import makeWASocket, {
  Browsers,
  useMultiFileAuthState,
} from '@whiskeysockets/baileys';
import { activeSessions } from './create_sessions/active_sessions';

export async function getSession(sessionID: string) {
  let session = activeSessions[sessionID];
  let timeout = 0;
  if (!session) {
    timeout = 4000;
    const { state, saveCreds } = await useMultiFileAuthState(
      `bailey-${sessionID}`,
    );
    session = makeWASocket({
      printQRInTerminal: true,
      browser: Browsers.ubuntu('Chrome'),
      auth: state,
    });
    activeSessions[sessionID] = session;
  }
  return { session, timeout };
}

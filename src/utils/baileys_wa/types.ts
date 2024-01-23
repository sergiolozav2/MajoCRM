import makeWASocket from '@whiskeysockets/baileys';

export interface BaileysCallbacks {
  onLoadedQR: (qrURI: string) => void;
  onError: (message: string) => void;
  onScannedQR: () => void;
}

export type SesionWA = ReturnType<typeof makeWASocket>;

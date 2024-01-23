import { SesionWA } from '../types';

export function endConnection(socket: SesionWA) {
  socket.end(new Error('Desconectado'));
}

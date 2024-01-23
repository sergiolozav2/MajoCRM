import { SesionWA } from '../types';

export const activeSessions: {
  [key: string]: SesionWA | undefined;
} = {};

'use strict';

import { BufferJSON, WAProto, initAuthCreds } from '@whiskeysockets/baileys';

/**
 * Me cree mi propio AuthState para guardar datos pero no creo que funcione
 * */

const store: { [key: string]: any } = {};
const useCustomAuthState = async (sesionID: string) => {
  function key(id: string) {
    return `${sesionID}-${id}`;
  }
  async function writeData(data: any, id: string) {
    const jsonData = JSON.stringify(data, BufferJSON.replacer);
    store[key(id)] = jsonData;
    return jsonData;
  }
  async function readData(id: string) {
    try {
      const data = await store[key(id)];
      return JSON.parse(data, BufferJSON.reviver);
    } catch (error) {
      return null;
    }
  }
  const removeData = async (id: string) => {
    delete store[key(id)];
  };

  const creds = (await readData(sesionID)) || initAuthCreds();
  return {
    state: {
      creds,
      keys: {
        get: async (type: string, ids: string[]) => {
          const data: { [key: string]: any } = {};
          await Promise.all(
            ids.map(async (id) => {
              let value = await readData(`${type}-${id}`);
              if (type === 'app-state-sync-key' && value) {
                value = WAProto.Message.AppStateSyncKeyData.fromObject(value);
              }
              data[id] = value;
            }),
          );
          return data;
        },
        set: async (data: { [key: string]: any }) => {
          const tasks = [];
          for (const category in data) {
            for (const id in data[category]) {
              const value = data[category][id];
              const file = `${category}-${id}.json`;
              tasks.push(value ? writeData(value, file) : removeData(file));
            }
          }
          await Promise.all(tasks);
        },
      },
    },
    saveCreds: () => {
      return writeData(creds, 'creds');
    },
  };
};

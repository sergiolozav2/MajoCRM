import { AnyMessageContent } from '@whiskeysockets/baileys';
import { getSession } from './getSession';

type SendMessageType = GenericMessage & {
  sesionID: string;
  telefono: string;
};

type GenericMessage = TextMessage | ImageMessage;

export async function sendMessageWA(data: SendMessageType) {
  let { session, timeout } = await getSession(data.sesionID);

  const payload = createMessagePayload(data);
  const jid = `${data.telefono}@s.whatsapp.net`;
  setTimeout(() => {
    session
      .sendMessage(jid, payload)
      .then((r) => {
        console.log(r);
      })
      .catch((e) => {
        console.log(e);
      });
  }, timeout);

  return true;
}

interface TextMessage {
  type: 'text';
  mensaje: string;
}

interface ImageMessage {
  type: 'image';
  url: string;
}

function createMessagePayload(data: GenericMessage): AnyMessageContent {
  switch (data.type) {
    case 'image':
      return {
        image: {
          url: data.url,
        },
      };
    case 'text':
      return { text: data.mensaje };
  }
}

import io from 'socket.io-client';
import { useCallback } from 'react';

const backUrl = 'http://192.168.0.10:8909';

const sockets: { [key: string]: SocketIOClient.Socket } = {};
const useSocket = (
  chattype?: string
): [SocketIOClient.Socket | undefined, () => void] => {
  console.log('rerender', chattype);

  const disconnect = useCallback(() => {
    if (chattype) {
      sockets[chattype].disconnect();
      delete sockets[chattype];
    }
  }, [chattype]);

  if (!chattype) {
    return [undefined, disconnect];
  }

  if (!sockets[chattype]) {
    console.log(`${backUrl}/ct-${chattype}`);

    sockets[chattype] = io.connect(`${backUrl}/ct-${chattype}`, {
      transports: ['websocket'],
      // credentials: true,
    });
  }

  return [sockets[chattype], disconnect];
};

export default useSocket;

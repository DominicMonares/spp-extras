import { port, wsUrl } from '../config';
import { WebSocketMessage } from '../../types';


const accountWideSocket = new WebSocket(`${wsUrl}:${port}/ws/account_wide/transfer/`);

const connect: WebSocketMessage = (dispatchMessage) => {
  accountWideSocket.onopen = () => {
    console.log('Account-Wide WebSocket connection created!');
  }

  accountWideSocket.onclose = () => {
    console.log('Account-Wide WebSocket connection closed!');
  }

  accountWideSocket.onmessage = e => {
    const data = JSON.parse(e.data);
    const message = data.message;
    dispatchMessage(message);
  }
}

export const openAccountWideSocket: WebSocketMessage = (dispatchMessage, settings) => {
  connect(dispatchMessage);
  accountWideSocket.send(JSON.stringify(settings));
}

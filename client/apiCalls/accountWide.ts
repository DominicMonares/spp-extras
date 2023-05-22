import { port, wsUrl } from '../config';
import { WebSocketMessage } from '../types';


const gameSocket = new WebSocket(`${wsUrl}:${port}/ws/account_wide/transfer/`);

const connect: WebSocketMessage = (dispatchMessage) => {
  gameSocket.onopen = () => {
    console.log('Account-Wide WebSocket connection created!');
  }

  gameSocket.onclose = () => {
    console.log('Account-Wide WebSocket connection closed!');
  }

  gameSocket.onmessage = e => {
    const data = JSON.parse(e.data);
    const message = data.message;
    dispatchMessage(message);
  }
}

export const openAccountWideSocket: WebSocketMessage = (dispatchMessage, settings) => {
  connect(dispatchMessage);
  gameSocket.send(JSON.stringify(settings));
}

import { port, wsUrl } from '../config';
import { WebSocketMessage } from '../types';


const gameSocket = new WebSocket(`${wsUrl}:${port}/ws/account_wide/mounts_pets/`);

const connect: WebSocketMessage = (dispatchMessage) => {
  gameSocket.onopen = () => {
    console.log('Mounts and pets WebSocket connection created!');
  }

  gameSocket.onclose = () => {
    console.log('Mounts and pets WebSocket connection closed!');
  }

  gameSocket.onmessage = e => {
    const data = JSON.parse(e.data);
    const message = data.message;
    dispatchMessage(message);
  }
}

export const mountsAndPetsSocket: WebSocketMessage = async (dispatchMessage) => {
  connect(dispatchMessage);
  gameSocket.send(JSON.stringify({
    'message': 'player'
  }));
}

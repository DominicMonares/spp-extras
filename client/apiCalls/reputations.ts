import { port, wsUrl } from '../config';
import { WebSocketMessage } from '../types';


const gameSocket = new WebSocket(`${wsUrl}:${port}/ws/account_wide/reputations/`);

const connect: WebSocketMessage = (dispatchMessage) => {
  gameSocket.onopen = () => {
    console.log('Reputation WebSocket connection created!');
  }

  gameSocket.onclose = () => {
    console.log('Reputation WebSocket connection closed!');
  }

  gameSocket.onmessage = e => {
    const data = JSON.parse(e.data);
    const message = data.message;
    dispatchMessage(message);
  }
}

export const openReputationSocket: WebSocketMessage = async (dispatchMessage) => {
  connect(dispatchMessage);
  gameSocket.send(JSON.stringify({
    'message': 'player'
  }));
}

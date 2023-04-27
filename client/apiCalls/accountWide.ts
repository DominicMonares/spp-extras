import { port, wsUrl } from '../config';
import { WebSocketMessage } from '../types';


let gameSocket: WebSocket;

const connect: WebSocketMessage = (dispatchMessage) => {
  gameSocket.onopen = () => {
    console.log('WebSocket connection created!');
  }

  gameSocket.onclose = () => {
    console.log('WebSocket connection closed!');
  }

  gameSocket.onmessage = e => {
    const data = JSON.parse(e.data);
    const message = data.message;
    dispatchMessage(message);
  }
}

export const runAccountWide: WebSocketMessage = async (dispatchMessage, type, botsActive) => {
  if (type === 'achievements') {
    gameSocket = new WebSocket(`${wsUrl}:${port}/ws/account_wide/achievements/`);
  } else if (type === 'reputations') {
    gameSocket = new WebSocket(`${wsUrl}:${port}/ws/account_wide/reputations/`);
  }

  connect(dispatchMessage);
  gameSocket.send(JSON.stringify({
    'message': botsActive ? 'bots' : 'player'
  }));
}

import { port, wsUrl } from '../config';
import { WebSocketMessage } from '../types';


const gameSocket = new WebSocket(`${wsUrl}:${port}/ws/account_wide/achievements/`);

const connect: WebSocketMessage = (dispatchMessage) => {
  gameSocket.onopen = () => {
    console.log('Achievement WebSocket connection created!');
  }

  gameSocket.onclose = () => {
    console.log('Achievement WebSocket connection closed!');
  }

  gameSocket.onmessage = e => {
    const data = JSON.parse(e.data);
    const message = data.message;
    dispatchMessage(message);
  }
}

export const openAchievementSocket: WebSocketMessage = async (dispatchMessage, botsActive) => {
  connect(dispatchMessage);
  gameSocket.send(JSON.stringify({
    'message': botsActive ? 'bots' : 'player'
  }));
}

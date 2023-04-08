import { port, wsUrl } from '../config';


const gameSocket = new WebSocket(`${wsUrl}:${port}/ws/account_wide/achievements/`);

const connect = (dispatchMessage) => {
  gameSocket.onopen = () => {
    console.log('WebSocket connection created!');
  }

  gameSocket.onclose = () => {
    console.log('WebSocket connection closed!');
  }

  gameSocket.onmessage = (e: any) => { // TEMP ANY
    const data = JSON.parse(e.data);
    const message = data.message;
    dispatchMessage(message);
    console.log('FINAL MESSAGE ', message);
  }
}

export const fetchAchievements: any = async (dispatchMessage) => { // TEMP ANY
  connect(dispatchMessage);
  gameSocket.send(JSON.stringify({
    'message': 'WEBSOCKET TEST!!!!!'
  }));
}

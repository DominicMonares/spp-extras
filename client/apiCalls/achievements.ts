import { port, wsUrl } from '../config';


const gameSocket = new WebSocket(`${wsUrl}:${port}/ws/achievements/account_wide/`);

const connect = () => {
  gameSocket.onopen = () => {
    console.log('WebSocket connection created!');
  }

  gameSocket.onclose = () => {
    console.log('WebSocket connection closed!');
  }

  gameSocket.onmessage = (e: any) => { // TEMP ANY
    const data = JSON.parse(e.data);
    const message = data.message;
    console.log('FINAL MESSAGE ', message);
  }
}

export const fetchAchievements: any = async () => { // TEMP ANY
  connect();
  gameSocket.send(JSON.stringify({
    'message': 'WEBSOCKET TEST!!!!!'
  }));
}

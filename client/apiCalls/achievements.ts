import { port, wsUrl } from '../config';


const gameSocket = new WebSocket(`${wsUrl}:${port}/ws/achievements/account_wide/`);

const connect = () => {
  gameSocket.onopen = () => {
    console.log('WebSocket connection created!');
    gameSocket.send(JSON.stringify({
      'event': 'SHARE',
      'message': ''
    }))
  }

  gameSocket.onclose = () => {
    console.log('WebSocket connection closed!');
  }

  gameSocket.onmessage = (e: any) => { // TEMP ANY
    const data = JSON.parse(e.data).payload;
    const message = data.message;
    const event = data.event;
    switch (event) {
      case 'SHARE':
        console.log('FINAL MESSAGE ', message);
        break;
      default:
        console.log('No event!');
    }
  }

  if (gameSocket.readyState === WebSocket.OPEN) {
    gameSocket.onopen({} as Event); // TEMP
  }
}

export const fetchAchievements: any = async (expansion: any) => { // TEMP ANY
  connect();
  const data = {
    'event': 'SHARE',
    'message': ''
  }

  gameSocket.send(JSON.stringify(data));
}

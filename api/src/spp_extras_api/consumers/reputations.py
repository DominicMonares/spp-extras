import json
from channels.generic.websocket import WebsocketConsumer
from spp_extras_api.queries.characters import (
    sel_all_char_rep
)


class AccountWideReputationsConsumer(WebsocketConsumer):
    def connect(self):
        print('Connected to reputation WebSocket!')
        self.accept()

    def disconnect(self, close_code):
        print('Disconnected from reputation WebSocket!')
        pass

    # Run all reputation sharing functions when account-wide rep message is received
    # Message contents determine whether to run for players and bots or just players
    def receive(self, text_data):
        def send_msg(msg): self.send(json.dumps({'message': msg}))
        bots_active = True
        message_data = json.loads(text_data)
        message = message_data['message']
        if message == 'player':
            bots_active = False

        # Fetch character reputation data
        try:
            send_msg('Fetching character reputation data...')
            char_rep_data = sel_all_char_rep('wotlk')
            send_msg('Character reputation data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch character reputation data!')
            send_msg(f'Error: {e}')
            return
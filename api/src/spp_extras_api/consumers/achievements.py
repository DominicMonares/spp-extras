import json
from channels.generic.websocket import WebsocketConsumer


class AccountWideAchievementsConsumer(WebsocketConsumer):
    def connect(self):
        self.channel_layer.group_add(
            'account-wide',
            self.channel_name,
        )

        self.accept()
        print('CONNECTED TO WEBSOCKET')

    def disconnect(self, close_code):
        self.channel_layer.group_discard(
            'account-wide',
            self.channel_name,
        )

        print('DISCONNECTED FROM WEBSOCKET')

    def receive(self, text_data):
        response = json.loads(text_data)
        event = response.get('event', None)
        message = response.get('message', None)

        if event == 'SHARE':
            self.channel_layer.group_send('account-wide', {
                'type': 'send_message',
                'message': message,
                'event': 'SHARE',
            })

    def send_message(self, res):
        self.send(text_data  =json.dumps({
            'payload': res,
        }))

import json
from channels.generic.websocket import WebsocketConsumer


class AccountWideReputationsConsumer(WebsocketConsumer):
    def connect(self):
        print('CONNECTED TO WEBSOCKET')
        self.accept()

    def disconnect(self, close_code):
        print('DISCONNECTED FROM WEBSOCKET')
        pass

    def receive(self, text_data):
        def send_msg(msg): self.send(json.dumps({'message': msg}))
        bots_active = True
        message_data = json.loads(text_data)
        message = message_data['message']
        if message == 'player':
            bots_active = False
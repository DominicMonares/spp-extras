import json
from channels.generic.websocket import WebsocketConsumer


class AccountWideAchievementsConsumer(WebsocketConsumer):
    def connect(self):
        print('CONNECTED TO WEBSOCKET')
        self.accept()

    def disconnect(self, close_code):
        print('DISCONNECTED FROM WEBSOCKET')
        pass

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        res = json.dumps({'message': message})

        print(f'RECEIVED {text_data_json}')
        self.send(text_data=json.dumps({'message': message}))
        self.send(text_data=json.dumps({'message': message}))
        self.send(text_data=json.dumps({'message': message}))

    def send_message(self, res):
        self.send(text_data=json.dumps({
            'payload': res,
        }))

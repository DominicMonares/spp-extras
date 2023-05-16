import json
from channels.generic.websocket import WebsocketConsumer


class AccountWideConsumer(WebsocketConsumer):
    def connect(self):
        print('Connected to account-wide WebSocket!')
        self.accept()

    def disconnect(self, close_code):
        print('Disconnected from account-wide WebSocket!')
        pass

    # Run all account-wide transfers using settings sent through message
    def receive(self, text_data):
        def send_msg(msg): self.send(json.dumps({'message': msg}))
        settings = json.loads(text_data)
        petsMounts = settings['petsMounts'],
        reps = settings['reps'],
        achievements = settings['achievements'],
        bots = settings['bots']

        # Send initial message
        # Fetch account and char data
        # Run pets and mounts - send char data as arg
        # Run reps - send char data as arg
        # Run achievements - send char data as arg
        # Send final message

        # NOTE change existing functions with 'transfer_x' names to 'share_x'
        # These main functions will be names 'transfer_x'

import json
from channels.generic.websocket import AsyncJsonWebsocketConsumer


class AccountWideAchievements(AsyncJsonWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add(
            'account-wide',
            self.channel_name,
        )

        await self.accept()
        print('CONNECTED TO WEBSOCKET')

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            'account-wide',
            self.channel_name,
        )

        print('DISCONNECTED FROM WEBSOCKET')

    async def receive(self, text_data):
        response = json.loads(text_data)
        event = response.get('event', None)
        message = response.get('message', None)

        if event == 'SHARE':
            await self.channel_layer.group_send('account-wide', {
                'type': 'send_message',
                'message': message,
                'event': 'SHARE',
            })

    async def send_message(self, res):
        await self.send(text_data  =json.dumps({
            'payload': res,
        }))

import json
from channels.generic.websocket import WebsocketConsumer
from spp_extras_api.models.wotlkcharacters import \
    WotlkCharacterQueststatus,\
    WotlkCharacterQueststatusDaily,\
    WotlkCharacters
from spp_extras_api.models.wotlkrealmd import WotlkAccount
from spp_extras_api.utils.characters import all_characters
from spp_extras_api.utils.quests import all_completed_quests


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


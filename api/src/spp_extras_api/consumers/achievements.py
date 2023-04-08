import json
from channels.generic.websocket import WebsocketConsumer
from spp_extras_api.models.wotlkcharacters import \
    WotlkCharacterQueststatus,\
    WotlkCharacterQueststatusDaily,\
    WotlkCharacters
from spp_extras_api.models.wotlkmangos import WotlkQuestTemplate
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

    # Run all achievement and reward sharing functions when message received
    # Message contents do not matter
    # We're just looking for a signal to start from the client
    def receive(self, text_data):
        # Fetch all account data
        self.send(json.dumps({'message': 'Fetching account data...'}))
        accounts = WotlkAccount.objects\
            .using('wotlkrealmd')\
            .all()\
            .values('id', 'username')
        self.send(json.dumps({'message': 'Account data successfully fetched!'}))

        # Fetch all character data
        self.send(json.dumps({'message': 'Fetching character data...'}))
        characters = WotlkCharacters.objects\
            .using('wotlkcharacters')\
            .all()\
            .values('guid', 'account', 'name', 'race', 'class_field')
        self.send(json.dumps({'message': 'Character data successfully fetched!'}))

        # Fetch all completed regular quest data
        self.send(json.dumps({'message': 'Fetching completed regular quest data...'}))
        completed_regular = WotlkCharacterQueststatus.objects\
            .using('wotlkcharacters')\
            .all()\
            .filter(status__exact=1)\
            .values()
        self.send(json.dumps({'message': 'Completed regular quest data successfully fetched!'}))

        # Fetch all completed daily quest data
        self.send(json.dumps({'message': 'Fetching completed daily quest data...'}))
        completed_daily = WotlkCharacterQueststatusDaily.objects\
            .using('wotlkcharacters')\
            .all()\
            .values()
        self.send(json.dumps({'message': 'Completed daily quest data successfully fetched!'}))

        # Fetch template quests
        self.send(json.dumps({'message': 'Fetching template quest data...'}))
        template_quests = WotlkQuestTemplate.objects\
            .using('wotlkmangos')\
            .all()\
            .values(
                'entry',
                'zoneorsort',
                'type',
                'requiredclasses',
                'requiredraces',
                'title',
                'questflags'
            )
        self.send(json.dumps({'message': 'Template quest data successfully fetched!'}))

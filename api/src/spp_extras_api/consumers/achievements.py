import json
from channels.generic.websocket import WebsocketConsumer
from spp_extras_api.queries.characters import\
    char_achievement_shared_prog_exists,\
    create_char_achievement_shared_prog,\
    sel_all_char_achievements,\
    sel_all_char_data,\
    sel_all_completed_daily_quests,\
    sel_all_completed_reg_quests,\
    sel_all_char_achievement_shared_prog
from spp_extras_api.queries.mangos import sel_all_template_quests
from spp_extras_api.queries.realmd import sel_all_account_data


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
        msg = 'Fetching account data...'
        self.send(json.dumps({'message': msg}))
        accounts = sel_all_account_data('wotlk')
        msg = 'Account data successfully fetched!'
        self.send(json.dumps({'message': msg}))

        # Fetch all character data
        msg = 'Fetching character data...'
        self.send(json.dumps({'message': msg}))
        characters = sel_all_char_data('wotlk')
        msg = 'Character data successfully fetched!'
        self.send(json.dumps({'message': msg}))

        # Fetch all character achievement data
        msg = 'Fetching character achievement data...'
        self.send(json.dumps({'message': msg}))
        achievements = sel_all_char_achievements()
        msg = 'Character achievement data successfully fetched!'
        self.send(json.dumps({'message': msg}))

        # Fetch all completed regular quest data
        msg = 'Fetching completed regular quest data...'
        self.send(json.dumps({'message': msg}))
        completed_regular = sel_all_completed_reg_quests('wotlk')
        msg = 'Completed regular quest data successfully fetched!'
        self.send(json.dumps({'message': msg}))

        # Fetch all completed daily quest data
        msg = 'Fetching completed daily quest data...'
        self.send(json.dumps({'message': msg}))
        completed_daily = sel_all_completed_daily_quests('wotlk')
        msg = 'Completed daily quest data successfully fetched!'
        self.send(json.dumps({'message': msg}))

        # Fetch template quests
        msg = 'Fetching template quest data...'
        self.send(json.dumps({'message': msg}))
        template_quests = sel_all_template_quests('wotlk')
        msg = 'Template quest data successfully fetched!'
        self.send(json.dumps({'message': msg}))

        # Create CharacterAchievementSharedProgress table if it doesn't exist
        msg = 'Looking for shared achievement progress table...'
        self.send(json.dumps({'message': msg}))
        casp_table = char_achievement_shared_prog_exists()
        if not casp_table:
            msg = 'Shared achievement progress table not found!'
            self.send(json.dumps({'message': msg}))
            msg = 'Creating shared achievement progress table...'
            self.send(json.dumps({'message': msg}))
            create_char_achievement_shared_prog()
            msg = 'Shared achievement progress table created!'
            self.send(json.dumps({'message': msg}))
        else:
            msg = 'Shared achievement progress table found!'
            self.send(json.dumps({'message': msg}))
        
        # Fetch all shared achievements progress
        msg = 'Fetching all shared achievement progress data...'
        self.send(json.dumps({'message': msg}))
        shared_achievement_prog = sel_all_char_achievement_shared_prog()
        msg = 'Shared achievement progress data successfully fetched!'
        self.send(json.dumps({'message': msg}))
        

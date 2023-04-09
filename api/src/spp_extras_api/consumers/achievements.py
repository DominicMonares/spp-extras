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
from spp_extras_api.queries.mangos import\
    ins_cut_titles,\
    sel_all_template_quests,\
    sel_cut_title
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
        def send_msg(msg): self.send(json.dumps({'message': msg}))
        # fetch all data needed from db
        # run transfer credit
        # run transfer progress
        # run transfer pets and mounts

        # Create CharacterAchievementSharedProgress table if it doesn't exist
        try:
            send_msg('Looking for shared achievement progress table...')
            casp_table = char_achievement_shared_prog_exists()
            if not casp_table:
                send_msg('Shared achievement progress table not found!')
                send_msg('Creating shared achievement progress table...')
                create_char_achievement_shared_prog()
                send_msg('Shared achievement progress table successfully created!')
            else:
                send_msg('Shared achievement progress table found!')
        except:
            send_msg('Unable to find/create the shared achievement progress table!')
            return

        # Restore cut titles if they don't exist in db
        try:
            send_msg('Looking for cut titles...')
            cut_titles_exist = sel_cut_title()
            if cut_titles_exist:
                send_msg('Cut titles found!')
            else:
                send_msg('Cut titles not found!')
                send_msg('Adding cut titles to the database...')
                ins_cut_titles()
                send_msg('Cut titles successfully added to the database!')
        except:
            send_msg('Unable to find/add cut titles!')
            return

        # Fetch all account data
        try:
            send_msg('Fetching account data...')
            accounts = sel_all_account_data('wotlk')
            send_msg('Account data successfully fetched!')
        except:
            send_msg('Unable to fetch account data!')
            return

        # Fetch all character data
        try:
            send_msg('Fetching character data...')
            characters = sel_all_char_data('wotlk')
            send_msg('Character data successfully fetched!')
        except:
            send_msg('Unable to fetch character data!')
            return

        # Fetch all character achievement data
        try:
            send_msg('Fetching character achievement data...')
            achievements = sel_all_char_achievements()
            send_msg('Character achievement data successfully fetched!')
        except:
            send_msg('Unable to fetch character achievement data!')
            return

        # Fetch all completed regular quest data
        try:
            send_msg('Fetching completed regular quest data...')
            completed_regular = sel_all_completed_reg_quests('wotlk')
            send_msg('Completed regular quest data successfully fetched!')
        except:
            send_msg('Unable to fetch completed regular quest data!')
            return

        # Fetch all completed daily quest data
        try:
            send_msg('Fetching completed daily quest data...')
            completed_daily = sel_all_completed_daily_quests('wotlk')
            send_msg('Completed daily quest data successfully fetched!')
        except:
            send_msg('Unable to fetch completed daily quest data!')
            return

        # Fetch template quests
        try:
            send_msg('Fetching template quest data...')
            template_quests = sel_all_template_quests('wotlk')
            send_msg('Template quest data successfully fetched!')
        except:
            send_msg('Unable to fetch template quest data!')
            return

        # Fetch all shared achievements progress
        try:
            send_msg('Fetching all shared achievement progress data...')
            shared_achievement_prog = sel_all_char_achievement_shared_prog()
            send_msg('Shared achievement progress data successfully fetched!')
        except:
            send_msg('Unable to fetch shared achievement progress data!')
            return

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
from spp_extras_api.utils.achievements import format_completed_achievements
from spp_extras_api.utils.characters import format_characters, check_faction
from spp_extras_api.utils.quests import format_completed_quests, format_template_quests


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

        ########## Fetch/create all data needed for transfers ##########
        
        # Create CharacterAchievementSharedProgress table if it doesn't exist
        try:
            send_msg('Looking for shared achievement progress table...')
            casp_table = char_achievement_shared_prog_exists()
            if casp_table:
                send_msg('Shared achievement progress table found!')
            else:
                send_msg('Shared achievement progress table not found!')
                send_msg('Creating shared achievement progress table...')
                try:
                    create_char_achievement_shared_prog()
                    send_msg('Shared achievement progress table successfully created!')
                except Exception as e:
                    send_msg('Failed to create the shared achievement progress table!')
                    send_msg(f'Error: {e}')
                    return
        except Exception as e:
            send_msg('Failed to find the shared achievement progress table!')
            send_msg(f'Error: {e}')
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
                try:
                    ins_cut_titles()
                    send_msg('Cut titles successfully added to the database!')
                except Exception as e:
                    send_msg('Failed to add cut titles to database!')
                    send_msg(f'Error: {e}')
                    return
        except Exception as e:
            send_msg('Failed to find cut titles!')
            send_msg(f'Error: {e}')
            return

        ##### Characters #####

        # Fetch all account data
        try:
            send_msg('Fetching account data...')
            account_data = sel_all_account_data('wotlk')
            send_msg('Account data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch account data!')
            send_msg(f'Error: {e}')
            return

        # Fetch all character data
        try:
            send_msg('Fetching character data...')
            character_data = sel_all_char_data('wotlk')
            send_msg('Character data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch character data!')
            send_msg(f'Error: {e}')
            return
        
        ##### Achievements #####

        # Fetch all achievement credit data
        try:
            send_msg('Fetching character achievement data...')
            achievement_credit_data = sel_all_char_achievements()
            send_msg('Character achievement data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch character achievement data!')
            send_msg(f'Error: {e}')
            return

        # Fetch all shared achievements progress
        try:
            send_msg('Fetching all shared achievement progress data...')
            achievement_shared_prof_data = sel_all_char_achievement_shared_prog()
            send_msg('Shared achievement progress data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch shared achievement progress data!')
            send_msg(f'Error: {e}')
            return
        
        ##### Quests #####
        
        # Fetch all completed regular quest data
        try:
            send_msg('Fetching completed regular quest data...')
            completed_regular_data = sel_all_completed_reg_quests('wotlk')
            send_msg('Completed regular quest data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch completed regular quest data!')
            send_msg(f'Error: {e}')
            return

        # Fetch all completed daily quest data
        try:
            send_msg('Fetching completed daily quest data...')
            completed_daily_data = sel_all_completed_daily_quests('wotlk')
            send_msg('Completed daily quest data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch completed daily quest data!')
            send_msg(f'Error: {e}')
            return

        # Fetch template quests
        try:
            send_msg('Fetching template quest data...')
            template_quest_data = sel_all_template_quests('wotlk')
            send_msg('Template quest data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch template quest data!')
            send_msg(f'Error: {e}')
            return

        ########## Format fetched data ##########

        all_char_data = format_characters(account_data, character_data)
        achievements = format_completed_achievements(achievement_credit_data)
        completed_quests = format_completed_quests(
            character_data,
            completed_regular_data,
            completed_daily_data,
            [],
            []
        )

        # Weekly and monthly quests not tracked for any achievements (AFAIK)
        del completed_quests['weekly']
        del completed_quests['monthly']

        # Combine all character data
        for acct in all_char_data:
            for char in all_char_data[acct]:
                char_data = all_char_data[acct][char]
                faction = check_faction(char_data['requiredraces'])
                all_char_data[acct][char][faction]['achievements'] = achievements[char]
                all_char_data[acct][char][faction]['quests'] = completed_quests[char]


        template_quests = format_template_quests(template_quest_data)



        ########## Run transfers ##########

    



import json
from channels.generic.websocket import WebsocketConsumer
from spp_extras_api.queries.characters import\
    char_achievement_shared_prog_exists,\
    create_char_achievement_shared_prog,\
    ins_char_achievements,\
    sel_all_achievement_prog,\
    sel_all_char_achievements,\
    sel_all_char_data,\
    sel_all_char_rep,\
    sel_all_completed_daily_quests,\
    sel_all_completed_reg_quests,\
    sel_all_char_achievement_shared_prog,\
    sel_all_mail_items,\
    sel_last_item_inst_id,\
    sel_last_mail_id
from spp_extras_api.queries.mangos import\
    ins_cut_titles,\
    sel_all_achievement_rewards,\
    sel_all_template_quests,\
    sel_cut_title,\
    sel_rew_item_charges
from spp_extras_api.queries.realmd import sel_all_account_data
from spp_extras_api.utils.achievements import\
    combine_char_data,\
    format_achievement_credit,\
    format_achievement_prog,\
    format_achievement_rewards,\
    format_achievement_shared_prog,\
    format_rew_item_charges,\
    format_mail_item_data
from spp_extras_api.utils.achievement_credit_transfer import create_credit_args
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
        
        ##### Achievement Credit & Progress #####

        # Fetch all achievement credit data
        try:
            send_msg('Fetching achievement credit data...')
            achievement_credit_data = sel_all_char_achievements()
            send_msg('Achievement credit data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch achievement credit data!')
            send_msg(f'Error: {e}')
            return
        
        # Fetch all achievement progress data
        try:
            send_msg('Fetching achievement progress data...')
            achievement_prog_data = sel_all_achievement_prog()
            send_msg('Achievement progress data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch achievement progress data!')
            send_msg(f'Error: {e}')
            return
            
        # Fetch all shared achievement progress data
        try:
            send_msg('Fetching all shared achievement progress data...')
            achievement_shared_prog_data = sel_all_char_achievement_shared_prog()
            send_msg('Shared achievement progress data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch shared achievement progress data!')
            send_msg(f'Error: {e}')
            return

        ##### Achievement Item Rewards #####

        # Fetch achievement reward template data
        try:
            send_msg('Fetching achievement reward data...')
            achievement_rew_data = sel_all_achievement_rewards()
            send_msg('Achievement reward data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch achievement reward data!')
            send_msg(f'Error: {e}')
            return
        
        # Fetch achievement reward item charge data
        try:
            send_msg('Fetching achievement reward item charge data...')
            # Use achievement reward item IDs in query
            def rew_item_id(i): return i['item']
            rew_item_ids = map(rew_item_id, achievement_rew_data)
            rew_item_charge_data = sel_rew_item_charges(rew_item_ids)
            send_msg('Achievement reward item charge data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch achievement reward item charge data!')
            send_msg(f'Error: {e}')
            return

        # Fetch last item instance ID
        try:
            send_msg('Fetching last item instance ID data...')
            last_item_inst_id = sel_last_item_inst_id()
            send_msg('Last item instance ID data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch last item instance ID data!')
            send_msg(f'Error: {e}')
            return

        # Fetch last mail ID
        try:
            send_msg('Fetching last mail ID data...')
            last_mail_id = sel_last_mail_id()
            send_msg('Last mail ID data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch last mail ID data!')
            send_msg(f'Error: {e}')
            return
        
        # Fetch mail item data
        try:
            send_msg('Fetching mail item data...')
            mail_item_data = sel_all_mail_items()
            send_msg('Mail item data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch mail item data!')
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

        # Fetch template quest data
        try:
            send_msg('Fetching template quest data...')
            template_quest_data = sel_all_template_quests('wotlk')
            send_msg('Template quest data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch template quest data!')
            send_msg(f'Error: {e}')
            return
        
        # Fetch character reputation data
        try:
            send_msg('Fetching character reputation data...')
            char_rep_data = sel_all_char_rep('wotlk')
            send_msg('Character reputation data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch character reputation data!')
            send_msg(f'Error: {e}')
            return
        
        ########## Format fetched data ##########

        send_msg('Formatting fetched data...')
        characters = format_characters(account_data, character_data)
        achievement_credit = format_achievement_credit(achievement_credit_data)
        achievement_prog = format_achievement_prog(achievement_prog_data)
        achievement_shared_prog = format_achievement_shared_prog(achievement_shared_prog_data)
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

        # Combine all formatted character data
        all_char_data = combine_char_data(
            characters, 
            achievement_credit, 
            achievement_prog, 
            achievement_shared_prog,
            completed_quests
        )

        achievement_rewards = format_achievement_rewards(achievement_rew_data)
        item_charges = format_rew_item_charges(rew_item_charge_data)
        mail_items = format_mail_item_data(mail_item_data)
        template_quests = format_template_quests(template_quest_data)
        send_msg('Fetched data successfully formatted!')

        ########## Run transfers and create db query arguments ##########

        # Create data to be used in create_credit_args

        # Run progress transfer and add any new achievements in all_char_data
        send_msg('Sharing achievement progress between characters...')
        send_msg('Achievement progress successfully shared between characters!')

        # Run credit transfer which runs reward transfers
        credit_arg_data = {
            'all_char_data': all_char_data,
            'ach_rewards': achievement_rewards,
            'item_charges': item_charges,
            'last_item_inst_id': last_item_inst_id,
            'last_mail_id': last_mail_id
        }

        send_msg('Sharing achievement credit and rewards between characters...')
        ach_credit_args = create_credit_args(credit_arg_data)
        credit_args = ach_credit_args['credit_args']
        item_inst_args = ach_credit_args['item_inst_args']
        mail_args = ach_credit_args['mail_args']
        mail_item_args = ach_credit_args['mail_item_args']
        title_args = ach_credit_args['title_args']
        send_msg('Achievement credit and rewards successfully shared between characters!')

        ########## Run queries to save new data ##########

        # Save new progress

        # Save new credit
        if credit_args:
            try:
                send_msg('Saving new achievement credit data...')
                ins_char_achievements(credit_args)
                send_msg('New achievement credit data successfully saved!')
            except Exception as e:
                send_msg('Failed to save new achievement credit data!')
                send_msg(f'Error: {e}')
                return

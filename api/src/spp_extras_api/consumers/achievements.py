import json
from channels.generic.websocket import WebsocketConsumer
from spp_extras_api.queries.characters import\
    char_achievement_shared_prog_exists,\
    create_char_achievement_shared_prog,\
    ins_achievement_prog,\
    ins_char_achievement_shared_prog,\
    ins_char_achievements,\
    ins_reward_item_instances,\
    ins_reward_mail,\
    ins_reward_mail_items,\
    sel_all_achievement_prog,\
    sel_all_char_achievements,\
    sel_all_chars,\
    sel_all_char_rep,\
    sel_all_completed_daily_quests,\
    sel_all_completed_reg_quests,\
    sel_all_char_achievement_shared_prog,\
    sel_last_item_inst_id,\
    sel_last_mail_id,\
    upd_reward_titles
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
    format_rew_item_charges
from spp_extras_api.utils.achievement_credit_transfer import create_credit_args
from spp_extras_api.utils.achievement_prog_transfer import create_prog_args
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
            character_data = sel_all_chars('wotlk')
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
            achievement_char_prog_data = sel_all_achievement_prog()
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
            last_item_inst_id = sel_last_item_inst_id()['guid']
            send_msg('Last item instance ID data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch last item instance ID data!')
            send_msg(f'Error: {e}')
            return

        # Fetch last mail ID
        try:
            send_msg('Fetching last mail ID data...')
            last_mail_id = sel_last_mail_id()['id']
            send_msg('Last mail ID data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch last mail ID data!')
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
        # try:
        characters = format_characters(account_data, character_data)
        achievement_credit = format_achievement_credit(achievement_credit_data)
        achievement_char_prog = format_achievement_prog('char', achievement_char_prog_data)
        achievement_shared_prog = format_achievement_prog(
            'shared', 
            achievement_shared_prog_data
        )
        
        # Weekly and monthly quests not tracked for any achievements (AFAIK)
        completed_quests = format_completed_quests(
            completed_regular_data,
            completed_daily_data,
            [],
            []
        )

        # Combine all formatted character data
        all_chars = combine_char_data(
            characters, 
            achievement_credit, 
            achievement_char_prog, 
            achievement_shared_prog,
            completed_quests
        )

        achievement_rewards = format_achievement_rewards(achievement_rew_data)
        item_charges = format_rew_item_charges(rew_item_charge_data)
        template_quests = format_template_quests(template_quest_data)
        send_msg('Fetched data successfully formatted!')
        # except Exception as e:
        #     send_msg('Failed to format fetched data!')
        #     send_msg(f'Error: {e}')
        #     return

        ########## Run transfers and create db query arguments ##########

        # Run progress transfer and add any new achievements in all_chars
        send_msg('Transferring achievement progress between characters...')
        ach_prog_args = create_prog_args(all_chars, achievement_char_prog, template_quests)
        all_chars = ach_prog_args['new_chars']
        char_prog_args = ach_prog_args['char_prog_args']
        shared_prog_args = ach_prog_args['shared_prog_args']
        send_msg('Achievement progress successfully transferred between characters!')

        # Run credit transfer which runs reward transfers
        credit_arg_data = {
            'all_chars': all_chars,
            'ach_rewards': achievement_rewards,
            'item_charges': item_charges,
            'last_item_inst_id': last_item_inst_id,
            'last_mail_id': last_mail_id
        }

        send_msg('Transferring achievement credit and rewards between characters...')
        ach_credit_args = create_credit_args(credit_arg_data)
        credit_args = ach_credit_args['credit_args']
        item_inst_args = ach_credit_args['item_inst_args']
        mail_args = ach_credit_args['mail_args']
        mail_item_args = ach_credit_args['mail_item_args']
        title_args = ach_credit_args['title_args']
        send_msg('Achievement credit and rewards successfully transferred between characters!')

        ########## Run queries to save new data ##########

        # Save new character achievement progress
        if len(char_prog_args):
            try:
                send_msg('Saving new achievement progress data...')
                ins_achievement_prog(char_prog_args)
                send_msg('New achievement progress data successfully saved!')
            except Exception as e:
                send_msg('Failed to save new achievement progress data!')
                send_msg(f'Error: {e}')
                return
            
        # Save new shared achievement progress
        if len(shared_prog_args):
            try:
                send_msg('Saving new achievement progress data...')
                ins_char_achievement_shared_prog(shared_prog_args)
                send_msg('New achievement progress data successfully saved!')
            except Exception as e:
                send_msg('Failed to save new achievement progress data!')
                send_msg(f'Error: {e}')
                return

        # Save new credit
        if len(credit_args):
            try:
                send_msg('Saving new achievement credit data...')
                ins_char_achievements(credit_args)
                send_msg('New achievement credit data successfully saved!')
            except Exception as e:
                send_msg('Failed to save new achievement credit data!')
                send_msg(f'Error: {e}')
                return
            
        # Save new item instances
        if len(item_inst_args):
            try:
                send_msg('Saving new item instance data...')
                ins_reward_item_instances(item_inst_args)
                send_msg('New item instance data successfully saved!')
            except Exception as e:
                send_msg('Failed to save new item instance data!')
                send_msg(f'Error: {e}')
                return
            
        # Save new mail
        if len(mail_args):
            try:
                send_msg('Saving new mail data...')
                ins_reward_mail(mail_args)
                send_msg('New mail data successfully saved!')
            except Exception as e:
                send_msg('Failed to save new mail data!')
                send_msg(f'Error: {e}')
                return

        # Save new mail items
        if len(mail_item_args):
            try:
                send_msg('Saving new mail item data...')
                ins_reward_mail_items(mail_item_args)
                send_msg('New mail item data successfully saved!')
            except Exception as e:
                send_msg('Failed to save new mail item data!')
                send_msg(f'Error: {e}')
                return

        # Save new titles
        if len(title_args):
            try:
                send_msg('Saving new title data...')
                upd_reward_titles(title_args)
                send_msg('New title data successfully saved!')
            except Exception as e:
                send_msg('Failed to save new title data!')
                send_msg(f'Error: {e}')
                return
            
        send_msg('Account-wide achievements successfully transferred!')
        send_msg('You can safely close this tool now.')

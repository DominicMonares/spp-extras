import json
from channels.generic.websocket import WebsocketConsumer
from spp_extras_api.queries.characters import (
    char_ach_shared_prog_exists,
    create_char_ach_shared_prog,
    ins_ach_prog,
    ins_char_ach_shared_prog,
    ins_char_achs,
    ins_reward_item_instances,
    ins_reward_mail,
    ins_reward_mail_items,
    sel_all_ach_prog,
    sel_all_char_achs,
    sel_all_completed_reg_quests,
    sel_all_char_ach_shared_prog,
    sel_last_item_inst_id,
    sel_last_mail_id,
    upd_reward_titles
)
from spp_extras_api.queries.mangos import (
    ins_cut_titles,
    sel_all_ach_rewards,
    sel_all_template_quests,
    sel_cut_title,
    sel_rew_item_charges
)

from spp_extras_api.utils.achievements import (
    format_ach_credit,
    format_ach_prog,
    format_ach_rewards,
    format_all_acct_data,
    format_rew_item_charges
)
from api.src.spp_extras_api.utils.ach_credit import create_ach_credit_args
from api.src.spp_extras_api.utils.ach_prog import create_ach_prog_args

from spp_extras_api.utils.quests import format_completed_quests, format_template_quests


class AccountWideAchievementsConsumer(WebsocketConsumer):
    def connect(self):
        print('Connected to achievement WebSocket!')
        self.accept()

    def disconnect(self, close_code):
        print('Disconnected from achievement WebSocket!')
        pass

    # Run all achievement and reward sharing functions when account-wide achievement 
    # message is received
    # Message contents determine whether to run for players and bots or just players
    def receive(self, text_data):
        def send_msg(msg): self.send(json.dumps({'message': msg}))
        bots_active = True
        message_data = json.loads(text_data)
        message = message_data['message']
        if message == 'player':
            bots_active = False

        # ----------------------------------------------------------------
        # Create new data needed for transfers
        # ----------------------------------------------------------------

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
            casp_table = char_ach_shared_prog_exists()
            if casp_table:
                send_msg('Shared achievement progress table found!')
            else:
                send_msg('Shared achievement progress table not found!')
                send_msg('Creating shared achievement progress table...')
                try:
                    create_char_ach_shared_prog()
                    msg = 'Shared achievement progress table successfully created!'
                    send_msg(msg)
                except Exception as e:
                    msg = 'Failed to create the shared achievement progress table!'
                    send_msg(msg)
                    send_msg(f'Error: {e}')
                    return
        except Exception as e:
            send_msg('Failed to find the shared achievement progress table!')
            send_msg(f'Error: {e}')
            return
        
        # ----------------------------------------------------------------
        # Fetch and format data
        # ----------------------------------------------------------------

        # FETCH all achievement credit data
        try:
            send_msg('Fetching achievement credit data...')
            ach_credit_data = sel_all_char_achs()
            send_msg('Achievement credit data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch achievement credit data!')
            send_msg(f'Error: {e}')
            return

        # FORMAT achievement credit data
        ach_credit = format_ach_credit(ach_credit_data)

        # FETCH all achievement progress data
        try:
            send_msg('Fetching achievement progress data...')
            ach_prog_data = sel_all_ach_prog()
            send_msg('Achievement progress data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch achievement progress data!')
            send_msg(f'Error: {e}')
            return
        
        # FORMAT achievement progress data
        ach_prog = format_ach_prog('char', ach_prog_data)

        # FETCH all shared achievement progress data
        try:
            send_msg('Fetching all shared achievement progress data...')
            ach_shared_prog_data = sel_all_char_ach_shared_prog()
            send_msg('Shared achievement progress data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch shared achievement progress data!')
            send_msg(f'Error: {e}')
            return

        # FORMAT shared achievement progress data
        ach_shared_prog = format_ach_prog('shared', ach_shared_prog_data)

        # FETCH all completed regular quest data
        try:
            send_msg('Fetching completed regular quest data...')
            completed_reg_data = sel_all_completed_reg_quests('wotlk')
            send_msg('Completed regular quest data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch completed regular quest data!')
            send_msg(f'Error: {e}')
            return

        # FORMAT all completed regular quest data
        # Weekly and monthly quests not tracked for any achievements (AFAIK)
        completed_quests = format_completed_quests(
            completed_reg_data, [], [], [])

        # FORMAT all account and character related data
        all_acct_data = format_all_acct_data(
            accounts,
            ach_credit,
            ach_prog,
            ach_shared_prog,
            completed_quests)

        # FETCH achievement reward template data
        try:
            send_msg('Fetching achievement reward data...')
            ach_rew_data = sel_all_ach_rewards()
            send_msg('Achievement reward data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch achievement reward data!')
            send_msg(f'Error: {e}')
            return
        
        # FORMAT achievement reward template data
        ach_rewards = format_ach_rewards(ach_rew_data)

        # FETCH achievement reward item charge data
        try:
            send_msg('Fetching achievement reward item charge data...')
            # Use achievement reward item IDs in query
            def rew_item_id(i): return i['item']
            rew_item_ids = list(map(rew_item_id, ach_rew_data))
            rew_item_charge_data = sel_rew_item_charges(rew_item_ids)
            send_msg('Achievement reward item charge data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch achievement reward item charge data!')
            send_msg(f'Error: {e}')
            return
        
        # FORMAT achievement reward item charge data
        item_charges = format_rew_item_charges(rew_item_charge_data)

        # FETCH template quest data
        try:
            send_msg('Fetching template quest data...')
            template_quest_data = sel_all_template_quests('wotlk')
            send_msg('Template quest data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch template quest data!')
            send_msg(f'Error: {e}')
            return
        
        # FORMAT template quest data
        template_quests = format_template_quests(template_quest_data)

        # FETCH last item instance ID
        try:
            send_msg('Fetching last item instance ID data...')
            last_item_inst_id = sel_last_item_inst_id()['guid']
            send_msg('Last item instance ID data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch last item instance ID data!')
            send_msg(f'Error: {e}')
            return

        # FETCH last mail ID
        try:
            send_msg('Fetching last mail ID data...')
            last_mail_id = sel_last_mail_id()['id']
            send_msg('Last mail ID data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch last mail ID data!')
            send_msg(f'Error: {e}')
            return

        # ----------------------------------------------------------------
        # Run transfers
        # ----------------------------------------------------------------

        # Run progress transfer and add any new achievements in all_acct_data
        try:
            send_msg('Transferring achievement progress between characters...')
            ach_prog_args = create_ach_prog_args(all_acct_data, template_quests)
            all_acct_data = ach_prog_args['new_accounts']
            char_prog_args = ach_prog_args['char_prog_args']
            shared_prog_args = ach_prog_args['shared_prog_args']
            send_msg(
                'Achievement progress successfully transferred between characters!')
        except Exception as e:
            send_msg('Failed to transfer achievement progress between characters!')
            send_msg(f'Error: {e}')
            return

        # Run credit transfer which runs reward transfers
        try:
            send_msg(
                'Transferring achievement credit and rewards between characters...')
            ach_credit_args = create_ach_credit_args(
                all_acct_data, ach_rewards, item_charges, last_item_inst_id, last_mail_id)
            credit_args = ach_credit_args['credit_args']
            item_inst_args = ach_credit_args['item_inst_args']
            mail_args = ach_credit_args['mail_args']
            mail_item_args = ach_credit_args['mail_item_args']
            title_args = ach_credit_args['title_args']
            send_msg(
                'Achievement credit and rewards successfully transferred between characters!')
        except Exception as e:
            send_msg(
                'Failed to transfer achievement credit and rewards between characters!')
            send_msg(f'Error: {e}')
            return

        # ----------------------------------------------------------------
        # Run queries to save new data
        # ----------------------------------------------------------------

        # Save new character achievement progress
        if len(char_prog_args):
            try:
                send_msg('Saving new achievement progress data...')
                ins_ach_prog(char_prog_args)
                send_msg('New achievement progress data successfully saved!')
            except Exception as e:
                send_msg('Failed to save new achievement progress data!')
                send_msg(f'Error: {e}')
                return

        # Save new shared achievement progress
        if len(shared_prog_args):
            try:
                send_msg('Saving new achievement shared progress data...')
                ins_char_ach_shared_prog(shared_prog_args)
                send_msg(
                    'New achievement shared progress data successfully saved!')
            except Exception as e:
                send_msg('Failed to save new achievement shared progress data!')
                send_msg(f'Error: {e}')
                return

        # Save new credit
        if len(credit_args):
            try:
                send_msg('Saving new achievement credit data...')
                ins_char_achs(credit_args)
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

        send_msg('All account-wide achievement processes finished!')
        send_msg('You can safely close this tool now.')

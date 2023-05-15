import json
from channels.generic.websocket import WebsocketConsumer
from spp_extras_api.queries.characters import (
    sel_all_char_rep, 
    sel_all_chars,
    upd_char_rep
)
from spp_extras_api.queries.realmd import sel_all_accounts
from spp_extras_api.utils.characters import format_accts_n_chars, format_player_accts
from spp_extras_api.utils.reputations import format_reputations, transfer_reputations


class AccountWideReputationsConsumer(WebsocketConsumer):
    def connect(self):
        print('Connected to reputation WebSocket!')
        self.accept()

    def disconnect(self, close_code):
        print('Disconnected from reputation WebSocket!')
        pass

    # Run all reputation sharing functions when account-wide rep message is received
    # Only shared for player accounts - message contents do not matter
    def receive(self, text_data):
        def send_msg(msg): self.send(json.dumps({'message': msg}))

        # ----------------------------------------------------------------
        # Fetch and format data
        # ----------------------------------------------------------------

        # FETCH all account data
        try:
            send_msg('Fetching account data...')
            account_data = sel_all_accounts('wotlk')
            send_msg('Account data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch account data!')
            send_msg(f'Error: {e}')
            return

        # FETCH all character data
        try:
            send_msg('Fetching character data...')
            character_data = sel_all_chars('wotlk')
            send_msg('Character data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch character data!')
            send_msg(f'Error: {e}')
            return
        
        # FORMAT account and character data
        _accounts = format_accts_n_chars(account_data, character_data)
        accounts = format_player_accts(_accounts, False)
        characters = accounts['0']['characters']
        merged_chars = {**characters['alliance'], **characters['horde']}

        # Create list of character IDs for queries
        def id_num(id): return int(id)
        char_ids = list(map(id_num, merged_chars.keys()))

        # FETCH rep data for player accounts
        try:
            send_msg('Fetching character reputation data...')
            char_rep_data = sel_all_char_rep('wotlk', char_ids)
            send_msg('Character reputation data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch character reputation data!')
            send_msg(f'Error: {e}')
            return

        # FORMAT rep data for player accounts
        reputations = format_reputations(char_rep_data)

        # ----------------------------------------------------------------
        # Run transfer and query to save new data
        # ----------------------------------------------------------------

        # Run reputation progress transfer
        try:
            send_msg('Transferring reputation progress between characters...')
            rep_args = transfer_reputations(characters, reputations)
            send_msg(
                'Reputation progress successfully transferred between characters!')
        except Exception as e:
            send_msg('Failed to transfer reputation progress between characters!')
            send_msg(f'Error: {e}')
            return

        # Save new character reputation progress
        if len(rep_args):
            try:
                send_msg('Saving new reputation data...')
                upd_char_rep(rep_args)
                send_msg('New reputation data successfully saved!')
            except Exception as e:
                send_msg('Failed to save new reputation data!')
                send_msg(f'Error: {e}')
                return

        send_msg('All reputation processes finished!')
        send_msg('You can safely close this tool now.')

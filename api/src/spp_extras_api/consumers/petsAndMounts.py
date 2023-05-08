import json
from channels.generic.websocket import WebsocketConsumer
from spp_extras_api.queries.characters import (
    sel_all_chars
)
from spp_extras_api.queries.mangos import sel_pet_mount_items
from spp_extras_api.queries.realmd import sel_all_accounts
from spp_extras_api.utils.characters import format_accts_n_chars, format_player_accts


class AccountWidePetsMountsConsumer(WebsocketConsumer):
    def connect(self):
        print('Connected to mounts and pets WebSocket!')
        self.accept()

    def disconnect(self, close_code):
        print('Disconnected from mounts and pets WebSocket!')
        pass

    # Run all mount/pet sharing functions when account-wide mount/pet message received
    # Only shared for player accounts - message contents do not matter
    def receive(self, text_data):
        def send_msg(msg): self.send(json.dumps({'message': msg}))

        # ----------------------------------------------------------------
        # Fetch all existing data needed for transfers
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
        
        # FORMAT fetched account/char data
        try:
            send_msg('Formatting account and character data...')
            _accounts = format_accts_n_chars(account_data, character_data)
            accounts = format_player_accts(_accounts, False)
            characters = accounts['0']['characters']
            merged_chars = {**characters['alliance'], **characters['horde']}
            send_msg('Account and character data successfully formatted!')
        except Exception as e:
            send_msg('Failed to format account and character data!')
            send_msg(f'Error: {e}')
            return

        # FETCH template item data for pets and mounts
        try:
            send_msg('Fetching character reputation data...')
            char_ids = []
            for c in merged_chars:
                char_ids.append(int(c))
            char_rep_data = sel_all_char_rep('wotlk', char_ids)
            send_msg('Character reputation data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch character reputation data!')
            send_msg(f'Error: {e}')
            return

        # ----------------------------------------------------------------
        # Format fetched data
        # ----------------------------------------------------------------


        # ----------------------------------------------------------------
        # Run transfers and create db query arguments
        # ----------------------------------------------------------------


        # ----------------------------------------------------------------
        # Run queries to save new data
        # ----------------------------------------------------------------

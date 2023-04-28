import json
from channels.generic.websocket import WebsocketConsumer
from spp_extras_api.queries.characters import (
    sel_all_chars
)
from spp_extras_api.queries.realmd import sel_all_accounts
from spp_extras_api.utils.characters import format_accts_n_chars, format_player_accts


class AccountWideMountsPetsConsumer(WebsocketConsumer):
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
        # Create all new data needed for transfers
        # ----------------------------------------------------------------

        # Fetch all account data
        try:
            send_msg('Fetching account data...')
            account_data = sel_all_accounts('wotlk')
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
        
        # ----------------------------------------------------------------
        # Fetch all existing data needed for transfers
        # ----------------------------------------------------------------


        # ----------------------------------------------------------------
        # Format fetched data
        # ----------------------------------------------------------------


        # ----------------------------------------------------------------
        # Run transfers and create db query arguments
        # ----------------------------------------------------------------


        # ----------------------------------------------------------------
        # Run queries to save new data
        # ----------------------------------------------------------------

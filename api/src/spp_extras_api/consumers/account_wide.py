import json
from channels.generic.websocket import WebsocketConsumer
from spp_extras_api.queries.characters import sel_all_chars
from spp_extras_api.queries.realmd import sel_all_accounts
from spp_extras_api.transfers.achievements import transfer_achievements
from spp_extras_api.transfers.pets_mounts import transfer_pets_mounts
from spp_extras_api.transfers.reputations import transfer_reputations
from spp_extras_api.utils.characters import (
    create_char_ids, 
    format_accts_n_chars
)

class AccountWideConsumer(WebsocketConsumer):
    def connect(self):
        print('Connected to account-wide WebSocket!')
        self.accept()

    def disconnect(self, close_code):
        print('Disconnected from account-wide WebSocket!')
        pass

    # Run all account-wide transfers using settings sent through message
    def receive(self, text_data):
        def send_msg(msg): self.send(json.dumps({'message': msg}))
        settings = json.loads(text_data)
        pets_mounts = settings['petsMounts']
        reputations = settings['reputations']
        achievements = settings['achievements']
        bots = settings['bots']

        send_msg('Starting account-wide data transfers...')

        # ----------------------------------------------------------------
        # Fetch and format account and characters data
        # ---------------------------------------------------------------- 

        # FETCH all account data
        try:
            send_msg('Fetching account data...')
            account_data = sel_all_accounts('wotlk', bots)
            send_msg('Account data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch account data!')
            send_msg(f'Error: {e}')
            return

        # Create list of account IDs
        def acct_id(acct): return acct['id']
        account_ids = map(acct_id, account_data)

        # FETCH all character data
        try:
            send_msg('Fetching character data...')
            character_data = sel_all_chars('wotlk', account_ids)
            send_msg('Character data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch character data!')
            send_msg(f'Error: {e}')
            return

        # FORMAT account and character data
        accounts = format_accts_n_chars(account_data, character_data)
        char_ids = create_char_ids(accounts)

        # ----------------------------------------------------------------
        # Run transfers
        # ---------------------------------------------------------------- 

        # Transfer pet and mount spells
        if pets_mounts:
            try:
                send_msg('Starting pet and mount data transfers...')
                transfer_pets_mounts(accounts, char_ids, send_msg)
                send_msg('Pet and mount data transfers finished!')
            except Exception as e:
                send_msg('Failed to transfer pet and mount data!')
                send_msg(f'Error: {e}')
                return

        # Transfer reputation standings
        if reputations:
            try:
                send_msg('Starting reputation data transfers...')
                transfer_reputations(accounts, char_ids, send_msg)
                send_msg('Reputation data transfers finished!')
            except Exception as e:
                send_msg('Failed to transfer reputation data!')
                send_msg(f'Error: {e}')
                return
        
        # Transfer achievement progress, credit, and rewards
        if achievements:
            try:
                send_msg('Starting achievement data transfers...')
                transfer_achievements(accounts, char_ids, send_msg, bots)
                send_msg('Achievement data transfers finished!')
            except Exception as e:
                send_msg('Failed to transfer achievement data!')
                send_msg(f'Error: {e}')
                return

        send_msg('All account-wide data transfers finished!')
        send_msg('You can safely close this tool now.')

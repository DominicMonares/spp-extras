import json
from channels.generic.websocket import WebsocketConsumer
from spp_extras_api.queries.characters import (
    sel_all_chars,
    sel_char_pet_mount_spells,
    sel_char_riding_skills
)
from spp_extras_api.queries.mangos import sel_pet_mount_items
from spp_extras_api.queries.realmd import sel_all_accounts
from spp_extras_api.utils.characters import format_accts_n_chars, format_player_accts
from spp_extras_api.utils.pets_mounts import (
    format_char_spell_data,
    format_char_skill_data,
    format_pet_mount_item_data
)


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
        
        # FORMAT fetched account and character data
        _accounts = format_accts_n_chars(account_data, character_data)
        accounts = format_player_accts(_accounts, False)
        characters = accounts['0']['characters']
        merged_chars = {**characters['alliance'], **characters['horde']}
        
        # Create list of character IDs for queries
        def id_num(id): return int(id)
        char_ids = map(id_num, merged_chars.keys())

        # FETCH pet and mount item template data
        try:
            send_msg('Fetching pet and mount item data...')
            pet_mount_item_data = sel_pet_mount_items()
            send_msg('Pet and mount item data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch pet and mount item data!')
            send_msg(f'Error: {e}')
            return

        # FORMAT pet and mount item template data
        item_template = format_pet_mount_item_data(pet_mount_item_data)

        # Create list of pet and mount spell IDs for queries
        def spell_id_num(id): return id['spellid_2']
        spell_ids = map(spell_id_num, pet_mount_item_data)

        # FETCH character pet and mount spell data
        try:
            send_msg('Fetching character pet and mount spell data...')
            pet_mount_spell_data = sel_char_pet_mount_spells(char_ids, spell_ids)
            send_msg('Character pet and mount spell data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch character pet and mount spell data!')
            send_msg(f'Error: {e}')
            return

        # FORMAT character pet and mount spell data
        known_spells = format_char_spell_data(pet_mount_spell_data)

        # FETCH character riding skill data
        try:
            send_msg('Fetching character riding skill data...')
            riding_skill_data = sel_char_riding_skills(char_ids)
            send_msg('Character riding skill data successfully fetched!')
        except Exception as e:
            send_msg('Failed to fetch character riding skill data!')
            send_msg(f'Error: {e}')
            return
    
        # FORMAT character riding skill data
        char_riding_skills = format_char_skill_data(riding_skill_data)

        # ----------------------------------------------------------------
        # Transfer and save
        # ----------------------------------------------------------------


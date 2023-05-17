from spp_extras_api.queries.characters import (
    ins_char_pet_mount_spells,
    sel_all_chars,
    sel_char_pet_mount_spells,
    sel_char_riding_skills
)
from spp_extras_api.queries.mangos import sel_pet_mount_items
from spp_extras_api.queries.realmd import sel_all_accounts
from spp_extras_api.utils.characters import format_accts_n_chars, format_player_accts
from spp_extras_api.utils.pets_mounts import (
    create_pet_mount_spell_args,
    format_char_spell_data,
    format_char_skill_data,
    format_pet_mount_item_data
)


def transfer_pets_mounts(accounts, send_msg):
    # ----------------------------------------------------------------
    # Fetch and format data
    # ----------------------------------------------------------------
    characters = accounts['0']['characters']
    merged_chars = {**characters['alliance'], **characters['horde']}

    # Create list of character IDs for queries
    def id_num(id): return int(id)
    char_ids = list(map(id_num, merged_chars.keys()))

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
    pet_mount_items = format_pet_mount_item_data(pet_mount_item_data)

    # Create list of pet and mount spell IDs for queries
    def spell_id_num(id): return id['spellid_2']
    spell_ids = list(map(spell_id_num, pet_mount_item_data))

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
    # Create db query arguments and save new data
    # ----------------------------------------------------------------

    # Create arguments
    try:
        send_msg('Creating pet and mount arguments...')
        spell_args = create_pet_mount_spell_args(
            pet_mount_items, merged_chars, known_spells, char_riding_skills)
        send_msg('Pet and mount arguments successfully created!')
    except Exception as e:
        send_msg('Failed to create pet and mount arguments!')
        send_msg(f'Error: {e}')
        return

    # Save new character pet and mount spells
    if len(spell_args):
        try:
            send_msg('Saving new pet and mount spell data...')
            ins_char_pet_mount_spells(spell_args)
            send_msg('New pet and mount spell data successfully saved!')
        except Exception as e:
            send_msg('Failed to save new pet and mount spell data!')
            send_msg(f'Error: {e}')
            return

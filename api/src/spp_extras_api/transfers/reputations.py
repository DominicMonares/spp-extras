from spp_extras_api.queries.characters import (
    sel_all_char_rep, 
    sel_all_chars,
    upd_char_rep
)
from spp_extras_api.queries.realmd import sel_all_accounts
from spp_extras_api.utils.characters import format_accts_n_chars, format_player_accts
from spp_extras_api.utils.reputations import create_reputation_args, format_reputations


def transfer_reputations(accounts, send_msg):
    # ----------------------------------------------------------------
    # Fetch and format data
    # ----------------------------------------------------------------
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
    # Create db query arguments and save new data
    # ----------------------------------------------------------------

    # Create arguments
    try:
        send_msg('Creating reputation standing arguments...')
        rep_args = create_reputation_args(characters, reputations)
        send_msg('Reputation standing arguments successfully created!')
    except Exception as e:
        send_msg('Failed to create reputation standing arguments!')
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

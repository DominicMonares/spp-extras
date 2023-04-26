def check_faction(faction):
    alliance = [1, 3, 4, 7, 11]
    return 'alliance' if faction in alliance else 'horde'


# Organize characters by account
def format_accts_n_chars(accounts, characters):
    all = {}
    for account in accounts:
        all[str(account['id'])] = {
            'username': account['username'],
            'characters': {'alliance': {}, 'horde': {}}
        }

    for char in characters:
        account_num = str(char['account'])
        faction = check_faction(char['race'])
        all[account_num]['characters'][faction][str(char['guid'])] = char

    return all


# Combine player accounts into a single account separate from bots
def format_player_accts(accounts, bots_active):
    player_accts = []
    merged_acct = {
        'username': 'player_accts',
        'player_accts': [],
        'characters': {'alliance': {}, 'horde': {}}
    }

    for acct_id in accounts:
        acct = accounts[acct_id]
        if 'RNDBOT' not in acct['username']:
            player_accts.append(acct_id)
            chars = acct['characters']
            alliance_chars = merged_acct['characters']['alliance']
            horde_chars = merged_acct['characters']['horde']
            new_alliance_chars = {**alliance_chars, **chars['alliance']}
            new_horde_chars = {**horde_chars, **chars['horde']}
            merged_acct['characters']['alliance'] = new_alliance_chars
            merged_acct['characters']['horde'] = new_horde_chars

    # Add merged account to characters dict
    merged_acct['player_accts'] = player_accts
    accounts['0'] = merged_acct
    f = accounts['0']

    # Remove individual player accounts from main store
    for plyr_acct in player_accts:
        accounts.pop(plyr_acct)

    if bots_active:
        return accounts
    else:
        return {'0': accounts['0']}


# Organize reputation data by character
def format_reputations(reputations):
    all = {}
    for rep in reputations:
        guid = str(rep['guid'])
        faction = str(rep['faction'])
        standing = rep['standing']
        if guid not in all:
            all[guid] = {}
        all[guid][faction] = standing

    return all

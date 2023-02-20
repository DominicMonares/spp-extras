def check_faction(faction):
    alliance = [1, 3, 4, 7, 11]
    return 'alliance' if faction in alliance else 'horde'


def get_account_id(account):
    return account['id']


def all_characters(accounts, characters):
    player_accounts = {}
    chars = {'alliance': {}, 'horde': {}}

    for account in accounts:
        player_accounts[account['id']] = account['username']

    for char in characters:
        account_name = player_accounts[char['account']]
        char['account_name'] = account_name
        chars[check_faction(char['race'])][str(char['guid'])] = char

    return chars

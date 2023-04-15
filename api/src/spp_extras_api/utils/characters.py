def check_faction(faction):
    alliance = [1, 3, 4, 7, 11]
    return 'alliance' if faction in alliance else 'horde'


# Organize characters by account
def format_characters(accounts, characters):
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

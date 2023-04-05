def check_faction(faction):
    alliance = [1, 3, 4, 7, 11]
    return 'alliance' if faction in alliance else 'horde'


def get_account_id(account):
    return account['id']


# Combine all characters into one object sorted by faction
def all_characters(accounts, characters):
    all = {}

    for account in accounts:
        all[account['id']] = {
            'username': account['username'],
            'characters': {'alliance': {}, 'horde': {}}
        }

    for char in characters:
        account_num = char['account']
        faction = check_faction(char['race'])
        all[account_num]['characters'][faction][char['guid']] = char

    return all

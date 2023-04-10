from spp_extras_api.utils.characters import check_faction


# Organize achievement credit by character
def format_achievement_credit(achievements):
    all = {}
    for a in achievements:
        guid = achievements[a['guid']]
        if guid not in all:
            all[str(guid)] = {}
            
        achievement_id = a['achievement']
        all[guid][achievement_id] = a['date']
    
    return all


# Organize achievement proress by character
def format_achievement_prog(achievements):
    all = {}
    for a in achievements:
        guid = achievements[a['guid']]
        if guid not in all:
            all[str(guid)] = {}

        criteria = a['criteria']
        all[guid][criteria] = {
            'counter': a['counter'],
            'date': a['date']
        }
    
    return all


# Organize achievement shared progress by account
def format_achievement_shared_prog(achievements):
    all = {}
    for a in achievements:
        account = achievements[a['account']]
        if account not in all:
            all[str(account)] = {}

        achievement = a['achievement']
        all[account][achievement] = a['progress']

    return all


# Organize all quest, achievement, and other character related data by character
def combine_char_data(
    characters, 
    achievement_credit,
    achievement_prog,
    achievement_shared_prog,
    completed_quests
):
    all_char_data = characters
    for acct_id in all_char_data:
        acct_chars = all_char_data[acct_id]['characters']
        acct_achievement_progress = achievement_shared_prog[acct_id]
        all_char_data[acct_id]['achievement_shared_prog'] = acct_achievement_progress
        for faction in acct_chars:
            for char_id in acct_chars[faction]:
                char = acct_chars[faction][char_id]
                credit = achievement_credit[char]
                progress = achievement_prog[char]
                quests = completed_quests[char]
                all_char_data[acct_id][char][faction]['achievement_credit'] = credit
                all_char_data[acct_id][char][faction]['achievement_prog'] = progress
                all_char_data[acct_id][char][faction]['quests'] = quests

    return all_char_data

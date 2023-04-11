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


# Organize achievement progress by character
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
    # Use characters as base for all char data
    all_char_data = characters

    # Iterate through all accounts and characters to add data
    for acct_id in all_char_data:
        chars = all_char_data[acct_id]['characters']
        credit = { 'alliance': {}, 'horde': {} }
        shared_progress = achievement_shared_prog[acct_id]
        quests = { 'regular': {}, 'daily': {} }
        for faction in chars:
            for char_id in chars[faction]:
                # Add to account-wide achievement credit
                for achievement_id in achievement_credit[char_id]:
                    achievement = credit[faction][achievement_id]
                    existing_date = achievement['date']
                    incoming_date = achievement_credit[char_id][achievement_id]['date']
                    older_entry = existing_date > incoming_date

                    # Use oldest completion date
                    if not achievement or older_entry:
                        achievement = achievement_credit[char_id][achievement_id]
                        credit[faction][achievement_id] = achievement

                # Add to account-wide quest credit
                for quest_id in completed_quests[char_id]['regular']:
                    quest = completed_quests[char_id]['regular'][quest_id]
                    if not quests['regular'][quest_id]:
                        quests['regular'][quest_id] = quest

                for quest_id in completed_quests[char_id]['daily']:
                    quest = completed_quests[char_id]['daily'][quest_id]
                    if not quests['daily'][quest_id]:
                        quests['daily'][quest_id] = quest
                
                # Add all data to individual characters
                progress = achievement_prog[char_id]
                all_char_data[acct_id]['characters'][faction][char_id]['progress'] = progress

        # Add all data to accounts
        all_char_data[acct_id]['credit'] = credit
        all_char_data[acct_id]['shared_progress'] = shared_progress
        all_char_data[acct_id]['quests'] = quests

    return all_char_data

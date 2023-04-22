# Organize achievement credit by character
def format_ach_credit(achievements):
    all = {}
    for a in achievements:
        guid = str(a['guid'])
        if guid not in all:
            all[guid] = {}
            
        ach_id = str(a['achievement'])
        all[guid][ach_id] = a['date']
    
    return all


# Organize achievement progress by character or account
def format_ach_prog(type, achievements):
    all = {}
    for a in achievements:
        guid_or_acct = ''
        if type == 'char':
            guid_or_acct = str(a['guid'])
        else:
            guid_or_acct = str(a['account'])

        if guid_or_acct not in all:
            all[guid_or_acct] = {}

        # Criteria is separate from achievement ID
        # See progAchievements.json for corresponding achievement IDs
        criteria = str(a['criteria'])
        all[guid_or_acct][criteria] = {
            'counter': a['counter'],
            'date': a['date']
        }
    
    return all


# Organize all quest, achievement, and other character related data by character
def combine_char_data(
    characters, 
    achievement_credit,
    achievement_char_prog,
    achievement_shared_prog,
    completed_quests
):
    # Use characters as base for all char data
    all_char_data = characters

    # Iterate through all accounts and characters to add data
    for acct_id in all_char_data:
        account = all_char_data[acct_id]
        player_accts = []
        if acct_id == '0':
            player_accts = account['player_accts']

        # Combine characters
        alliance_chars = account['characters']['alliance']
        horde_chars = account['characters']['horde']
        merged_chars = {**alliance_chars, **horde_chars}
        all_char_data[acct_id]['characters'] = merged_chars
        chars = all_char_data[acct_id]['characters']

        credit = {}
        shared_progress = {}
        if acct_id in achievement_shared_prog:
            shared_progress = achievement_shared_prog[acct_id]
        quests = { 'regular': {}, 'daily': {} }
        
        if chars is not None:
            for char_id in chars:
                char = chars[char_id]
                valid_player_char = acct_id == '0' and str(char['account']) in player_accts
                valid_bot_char = acct_id != '0' and char['account'] == int(acct_id)
                if valid_player_char or valid_bot_char:
                    # Add to account-wide achievement credit
                    all_char_data[acct_id]['characters'][char_id]['credit'] = []
                    if char_id in achievement_credit:
                        for ach_id in achievement_credit[char_id]:
                            incoming_date = achievement_credit[char_id][ach_id]
                            existing_date = incoming_date
                            if ach_id in credit: existing_date = credit[ach_id]
                            # Use oldest completion date if achievement already exists
                            older_entry = existing_date > incoming_date
                            if ach_id not in credit or older_entry:
                                credit[ach_id] = incoming_date

                            # Add data for each character
                            char_credit = achievement_credit[char_id]
                            all_char_data[acct_id]['characters'][char_id]['credit'] = char_credit

                    # Add to account-wide quest credit
                    if char_id in completed_quests:
                        all_char_data[acct_id]['characters'][char_id]['quests'] = {}
                        
                        # Regular quests
                        for quest_id in completed_quests[char_id]['regular']:
                            quest = completed_quests[char_id]['regular'][quest_id]
                            quest_exists = quest_id in quests['regular']
                            if not quest_exists:
                                quests['regular'][quest_id] = quest
                            else:
                                existing_date = quests['regular'][quest_id]['timer']
                                incoming_date = quest['timer']
                                # Use more recent date for Loremaster progress
                                if incoming_date > existing_date:
                                    quests['regular'][quest_id] = quest

                        # Daily quests - MAY NOT BE NEEDED
                        for quest_id in completed_quests[char_id]['daily']:
                            quest = completed_quests[char_id]['daily'][quest_id]
                            if quest_id not in quests['daily']:
                                quests['daily'][quest_id] = quest
                    
                        char_quests = completed_quests[char_id]
                        all_char_data[acct_id]['characters'][char_id]['quests'] = char_quests

                    # Add data for each character
                    char_progress = {}
                    if char_id in achievement_char_prog:
                        char_progress = achievement_char_prog[char_id]

                    all_char_data[acct_id]['characters'][char_id]['progress'] = char_progress

        # Add data for each account
        all_char_data[acct_id]['credit'] = credit
        all_char_data[acct_id]['shared_progress'] = shared_progress
        all_char_data[acct_id]['quests'] = quests

    return all_char_data


# Organize achievement rewards by achievement
def format_ach_rewards(achievements):
    all = {}
    for a in achievements:
        # Store in arrays b/c of Matron/Patron duplicate
        entry = str(a['entry'])
        if entry not in all:
            all[entry] = [a]
        else:
            all[entry].append(a)

    return all


# Organize reward item charges by item
def format_rew_item_charges(items):
    all = {}
    for i in items:
        entry = str(i['entry'])
        all[entry] = i['spellcharges_1']

    return all

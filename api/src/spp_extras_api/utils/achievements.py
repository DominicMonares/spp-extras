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
        criteria = str(a['criteria'])
        all[guid_or_acct][criteria] = {
            'counter': a['counter'],
            'date': a['date']
        }

    return all


# Organize all quest, achievement, and other character related data by character
def combine_char_data(characters, ach_credit, ach_char_prog, ach_shared_prog, completed_quests):
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

        # Combine quests and achievement credit/progress
        credit = {}
        shared_progress = {}
        if acct_id in ach_shared_prog:
            shared_progress = ach_shared_prog[acct_id]
        quests = {}
        if chars is None: continue
        for char_id in chars:
            # Ensure character matches account
            char = chars[char_id]
            valid_player_acct = str(char['account']) in player_accts
            valid_player_char = acct_id == '0' and valid_player_acct
            valid_bot_acct = char['account'] == int(acct_id)
            valid_bot_char = acct_id != '0' and valid_bot_acct

            # Add to account-wide achievement credit if char is valid
            if not valid_player_char or not valid_bot_char: continue
            all_char_data[acct_id]['characters'][char_id]['credit'] = []
            if char_id in ach_credit:
                for ach_id in ach_credit[char_id]:
                    incoming_date = ach_credit[char_id][ach_id]
                    existing_date = incoming_date
                    if ach_id in credit:
                        existing_date = credit[ach_id]

                    # Use oldest completion date if achievement already exists
                    older_entry = existing_date > incoming_date
                    if ach_id not in credit or older_entry:
                        credit[ach_id] = incoming_date

                    # Add data for each character
                    char_credit = ach_credit[char_id]
                    all_char_data[acct_id]['characters'][char_id]['credit'] = char_credit

            # Add to account-wide quest credit
            if char_id in completed_quests:
                all_char_data[acct_id]['characters'][char_id]['quests'] = {}
                for quest_id in completed_quests[char_id]['regular']:
                    quest = completed_quests[char_id]['regular'][quest_id]
                    quest_exists = quest_id in quests
                    if not quest_exists:
                        quests[quest_id] = quest
                    else:
                        existing_date = quests[quest_id]['timer']
                        incoming_date = quest['timer']

                        # Use more recent date for Loremaster progress
                        if incoming_date > existing_date:
                            quests[quest_id] = quest

                char_quests = completed_quests[char_id]
                all_char_data[acct_id]['characters'][char_id]['quests'] = char_quests

            # Add data for each character
            char_progress = {}
            if char_id in ach_char_prog:
                char_progress = ach_char_prog[char_id]
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


# Check to see if achievement is faction specific and matches char faction
def faction_spef_char_match(ach_id, faction, faction_achievements):
    faction_match = False
    if ach_id in faction_achievements:
        faction_ach = faction_achievements[ach_id]
        if faction_ach['faction'] == faction:
            faction_match = True
        elif faction_ach['alt']:
            # Achievement has opposing faction equivalent
            ach_id = str(faction_ach['alt'])
            faction_match = True
        else:
            faction_match = False
    else:
        faction_match = True

    return faction_match

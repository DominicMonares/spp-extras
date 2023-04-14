import json
from from_root import from_root
from spp_extras_api.utils.loremaster import loremaster
with open(from_root('data/factionAchievements.json'), 'r') as json_file:
    faction_achievements = json.load(json_file)
with open(from_root('data/progAchievements.json'), 'r') as json_file:
    prog_achievements = json.load(json_file)
with open(from_root('data/zoneContinents.json'), 'r') as json_file:
    zone_continents = json.load(json_file)


# Got My Mind On My Money
gold = prog_achievements['gold']
top_gold = '3511'

# {X} Dungeon & Raid Emblems
emblems = prog_achievements['emblems']
top_emblems = '12421'

# # Looking for {X} - NYI
# lfm = prog_achievements['lfm']
# top_lfm = 'NYI'

# {X} Dedicated
dedicated = prog_achievements['dedicated']
top_dedicated = '1830'

# Arathi Basin Veteran
ab = prog_achievements['ab']
top_ab = '176'

# Alterac Valley Veteran
av = prog_achievements['dedicated']
top_av = '225'

# Eye of the Storm Veteran
eots = prog_achievements['eots']
top_eots = '223'

# # Isle of Conquest Veteran
# ioc = prog_achievements['ioc']
# top_ioc = 'NYI'

# Strand of the Ancients Veteran
sota = prog_achievements['sota']
top_sota = '4502'

# # Wintergrasp Veteran
# wg = prog_achievements['wg']
# top_wg = 'NYI'

# Warsong Gulch Veteran
wsg = prog_achievements['wsg']
top_wsg = '221'

# {X} Honorable Kills
honorable_kills = prog_achievements['honorableKills']
top_honorable_kills = '6790'

# The Bread Winner
bread = prog_achievements['bread']
top_bread = '3513'

# {X} Daily Quests Completed
daily = prog_achievements['daily']
top_daily = '2236'

# Loremaster of Eastern Kingdoms - Alliance
lm_ek_a = prog_achievements['lmEKA']
top_lm_ek_a = '7884'

# Loremaster of Kalimdor - Alliance"
lm_k_a = prog_achievements['lmKA']
top_lm_k_a = '7894'

# Loremaster of Eastern Kingdoms - Horde
lm_ek_h = prog_achievements['lmEKH']
top_lm_ek_h = '7890'

# Loremaster of Kalimdor - Horde
lm_k_h = prog_achievements['lmKH']
top_lm_k_h = '7896'

# {X} Quests Completed
quests = prog_achievements['quests']
top_quests = '2239'


def create_prog_args(all_chars, all_char_prog, template_quests):
    args = {
        'char_prog_args': [],
        'shared_prog_args': [],
        'new_chars': all_chars
    }

    for acct_id in all_chars:
        acct = all_chars[acct_id]
        chars = acct['characters']
        all_credit = acct['credit']
        all_shared_prog = acct['shared_progress']
        completed_quests = acct['quests']['regular']

        # Organize all char progress by shared prog achievement
        # Uses highest level in achievement chain
        # Only a handful of achievements are selected for sharing
        # See progAchievements.json for all selected achievements
        top_prog = {}

        def add_to_top_prog(top_id, chain):
            if top_id not in top_prog:
                top_prog[top_id] = chain[top_id]
                top_prog[top_id]['progress'] = [{
                    'counter': char_prog[top_id]['counter'],
                    'date': char_prog[top_id]['date']
                }]
            else:
                top_prog[top_id]['progress'].append({
                    'counter': char_prog[top_id]['counter'],
                    'date': char_prog[top_id]['date']
                })

        # Add existing progress for each char to top_prog
        for char_id in all_char_prog:
            char_prog = all_char_prog[char_id]

            if top_gold in char_prog:
                add_to_top_prog(top_gold, gold)

            if top_emblems in char_prog:
                add_to_top_prog(top_emblems, emblems)

            # NYI
            # if top_lfm in char_prog:
            #     add_to_top_prog(top_lfm, lfm)

            if top_dedicated in char_prog:
                add_to_top_prog(top_dedicated, dedicated)

            if top_ab in char_prog:
                add_to_top_prog(top_ab, ab)

            if top_av in char_prog:
                add_to_top_prog(top_av, av)

            if top_eots in char_prog:
                add_to_top_prog(top_eots, eots)

            # NYI
            # if top_ioc in char_prog:
            #     add_to_top_prog(top_ioc, ioc)

            if top_sota in char_prog:
                add_to_top_prog(top_sota, sota)

            # NYI
            # if top_wg in char_prog:
            #     add_to_top_prog(top_sota, wg)

            if top_wsg in char_prog:
                add_to_top_prog(top_wsg, wsg)

            if top_honorable_kills in char_prog:
                add_to_top_prog(top_honorable_kills, honorable_kills)

            if top_bread in char_prog:
                add_to_top_prog(top_bread, bread)

            if top_daily in char_prog:
                add_to_top_prog(top_daily, daily)

            if top_lm_ek_a in char_prog:
                add_to_top_prog(top_lm_ek_a, lm_ek_a)

            if top_lm_k_a in char_prog:
                add_to_top_prog(top_lm_k_a, lm_k_a)

            if top_lm_ek_h in char_prog:
                add_to_top_prog(top_lm_ek_h, lm_ek_h)

            if top_lm_k_h in char_prog:
                add_to_top_prog(top_lm_k_h, lm_k_h)

            if top_quests in char_prog:
                add_to_top_prog(top_quests, quests)

        # Run transfers for all criteria
        for criteria_id in top_prog:
            new_count = 0
            date = top_prog[criteria_id]['progress'][0]['date']

            # Loremaster progress calculated separately from the rest
            is_loremaster_alliance = criteria_id == 7884 or criteria_id == 7894
            is_loremaster_horde = criteria_id == 7890 or criteria_id == 7896
            is_loremaster = is_loremaster_alliance or is_loremaster_horde
            if not is_loremaster: 
                previous_count = 0
                new_progress = 0

                # Re-assign previous count and date if shared progress already exists
                acct_shared_exists = acct_id in all_shared_prog
                acct_shared_criteria_exists = False
                if acct_shared_exists: 
                    criteria_exists = criteria_id in all_shared_prog[acct_id]
                    acct_shared_criteria_exists = criteria_exists
                
                if acct_shared_criteria_exists:
                    shared_criteria = all_shared_prog[acct_id][criteria_id]
                    previous_count = shared_criteria['counter']
                    date = shared_criteria['date']
                
                # Calculate new count using previous count
                for top_criteria_prog in top_prog[criteria_id]['progress']:
                    # Use most recent date for progress
                    char_prog_date = top_criteria_prog['date']
                    if char_prog_date > date: 
                        date = char_prog_date
                    
                    # Add to new progress count
                    char_prog_count = top_criteria_prog['counter']
                    count = char_prog_count - previous_count
                    if count > 0:
                        new_progress += count
                    else:
                        new_progress += char_prog_count
                
                # Create final count sum
                new_count = previous_count + new_progress

                # Transfer shared achievement progress
                args['shared_prog_args'].append({
                    'account': acct_id,
                    'criteria': criteria_id,
                    'counter': new_count,
                    'date': date
                })

            # Transfer character achievement progress and credit
            def transfer_prog_n_credit(top_id, chain):
                for top_id in chain:
                    ach = chain[top_id]
                    ach_id = ach['achievement']
                    threshold = ach['threshold']
                    counter = new_count

                    # Use loremaster specific counter if on loremaster achievement
                    loremaster_a = loremaster(completed_quests, template_quests, 'alliance')
                    loremaster_h = loremaster(completed_quests, template_quests, 'horde')
                    if ach_id == 1676:
                        counter = loremaster_a[0]
                    elif ach_id == 1678:
                        counter = loremaster_a[1]
                    elif ach_id == 1677:
                        counter = loremaster_h[0]
                    elif ach_id == 1680:
                        counter = loremaster_h[1]

                    # Ensure progress counter doesn't exceed threshold
                    if counter > threshold: 
                        counter = threshold

                    # Check to see if new achievement is earned
                    # Add new achievement to all credit
                    if counter == threshold and ach_id not in all_credit:
                        all_credit[ach_id] = {
                            'guid': 0,
                            'achievement': ach_id,
                            'date': date
                        }

                    # Create arguments for char progress
                    # Make sure you don't add loremaster achievements to wrong faction!
                    for char_id in chars:
                        args['char_prog_args'].append({
                            'guid': char_id,
                            'criteria': top_id,
                            'counter': counter,
                            'date': date
                        })

            if criteria_id == top_gold:
                transfer_prog_n_credit(top_gold, gold)
            elif criteria_id == top_emblems:
                transfer_prog_n_credit(top_emblems, emblems)
            # elif criteria_id == top_lfm:
            #     transfer_prog_n_credit(top_lfm, lfm)
            elif criteria_id == top_dedicated:
                transfer_prog_n_credit(top_dedicated, dedicated)
            elif criteria_id == top_ab:
                transfer_prog_n_credit(top_ab, ab)
            elif criteria_id == top_av:
                transfer_prog_n_credit(top_av, av)
            elif criteria_id == top_eots:
                transfer_prog_n_credit(top_eots, emblems)
            # elif criteria_id == top_ioc:
            #     transfer_prog_n_credit(top_ioc, ioc)
            elif criteria_id == top_sota:
                transfer_prog_n_credit(top_sota, sota)
            # elif criteria_id == top_wg:
            #     transfer_prog_n_credit(top_wg, wg)
            elif criteria_id == top_wsg:
                transfer_prog_n_credit(top_wsg, wsg)
            elif criteria_id == top_honorable_kills:
                transfer_prog_n_credit(top_honorable_kills, honorable_kills)
            elif criteria_id == top_bread:
                transfer_prog_n_credit(top_bread, bread)
            elif criteria_id == top_daily:
                transfer_prog_n_credit(top_daily, daily)
            elif criteria_id == top_lm_ek_a:
                transfer_prog_n_credit(top_lm_ek_a, lm_ek_a)
            elif criteria_id == top_lm_k_a:
                transfer_prog_n_credit(top_lm_k_a, lm_k_a)
            elif criteria_id == top_lm_ek_h:
                transfer_prog_n_credit(top_lm_ek_h, lm_ek_h)
            elif criteria_id == top_lm_k_h:
                transfer_prog_n_credit(top_lm_k_h, lm_k_h)
            elif criteria_id == top_quests:
                transfer_prog_n_credit(top_quests, quests)

    # MAY NOT NEED DAILIES IN CHAR OBJ

    return args

import json
from from_root import from_root
from spp_extras_api.utils.loremaster import loremaster, misc_lm_criteria
with open(from_root('data/factionAchievements.json'), 'r') as json_file:
    faction_achievements = json.load(json_file)
with open(from_root('data/loremasterAchCriteria.json'), 'r') as json_file:
    loremaster_ach_criteria = json.load(json_file)
with open(from_root('data/sharedAchCriteria.json'), 'r') as json_file:
    shared_ach_criteria = json.load(json_file)
with open(from_root('data/zoneContinents.json'), 'r') as json_file:
    zone_continents = json.load(json_file)


def create_prog_args(all_chars, template_quests):
    args = {
        'char_prog_args': [],
        'shared_prog_args': [],
        'new_chars': all_chars
    }

    for acct_id in all_chars:
        acct = all_chars[acct_id]
        chars = acct['characters']
        credit = acct['credit']
        shared_progress = acct['shared_progress']
        completed_quests = acct['quests']['regular']
        loremaster_count = {
            'alliance_ek': {
                'count': 0,
                'date': 0000000000
            }, 
            'alliance_k': {
                'count': 0,
                'date': 0000000000
            }, 
            'horde_ek': {
                'count': 0,
                'date': 0000000000
            }, 
            'horde_k': {
                'count': 0,
                'date': 0000000000
            }
        }

        # Organize all character shared achievement progress by criteria
        new_shared_prog = {}

        def add_to_shared_prog(criteria_id, ach_prog):
            if criteria_id not in new_shared_prog:
                new_shared_prog[criteria_id] = [ach_prog]
            else:
                new_shared_prog[criteria_id].append(ach_prog)

        def create_char_prog_args(guid, criteria, counter, date):
            args['char_prog_args'].append({
                'guid': guid,
                'criteria': int(criteria),
                'counter': counter,
                'date': date
            })

        # Add existing progress for each char to new_shared_prog
        for char_id in chars:
            char = chars[char_id]
            char_prog = char['progress']
            for criteria_id in char_prog:
                if criteria_id in shared_ach_criteria:
                    ach_prog = char_prog[criteria_id]
                    add_to_shared_prog(criteria_id, ach_prog)

        # Run transfers for all shared progress
        for criteria_id in new_shared_prog:
            ach_prog = new_shared_prog[criteria_id]
            date = ach_prog[0]['date']
            previous_count = 0
            new_count = 0
            new_progress = 0

            # Re-assign previous count and date if shared progress already exists
            acct_shared_exists = len(shared_progress) > 0
            acct_shared_criteria_exists = False
            if acct_shared_exists: 
                criteria_exists = criteria_id in shared_progress
                acct_shared_criteria_exists = criteria_exists
            
            if acct_shared_criteria_exists:
                shared_criteria = shared_progress[criteria_id]
                previous_count = shared_criteria['counter']
                date = shared_criteria['date']
            
            # Calculate new count using previous count
            for char_ach_prog in ach_prog:
                # Use most recent date for progress
                char_prog_date = char_ach_prog['date']
                if char_prog_date > date: 
                    date = char_prog_date
                
                # Add to new progress count
                char_prog_count = char_ach_prog['counter']
                count = char_prog_count - previous_count
                if count >= 0:
                    new_progress += count
                else:
                    new_progress += char_prog_count
            
            # Create final count sum
            new_count = previous_count + new_progress

            # Add misc Loremaster criteria to loremaster_count if it exists
            misc_lm_crit = misc_lm_criteria(criteria_id)
            if misc_lm_crit:
                loremaster_count[misc_lm_crit] += 1

            # Transfer shared achievement progress
            args['shared_prog_args'].append({
                'account': acct_id,
                'criteria': int(criteria_id),
                'counter': new_count,
                'date': date
            })

            # Ensure progress counter doesn't exceed threshold
            threshold = shared_ach_criteria[criteria_id]['threshold']
            if new_count > threshold: 
                new_count = threshold

            # Check to see if new achievement is earned
            # Add new achievement to all credit
            ach_id = shared_ach_criteria[criteria_id]['achievement']
            if new_count == threshold and ach_id not in credit:
                credit[ach_id] = date

            # Transfer individual character progress
            for char_id in chars:
                create_char_prog_args(char_id, criteria_id, new_count, date)

        # Run transfers for Loremaster progress
        loremaster_count = loremaster(completed_quests, template_quests, loremaster_count)
        for char_id in chars:
            create_char_prog_args(char_id, criteria_id, new_count, date)
        


    # MAY NOT NEED DAILIES IN CHAR OBJ

    return args

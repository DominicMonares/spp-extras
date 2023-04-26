import calendar
import datetime
import json
from from_root import from_root
from spp_extras_api.utils.characters import check_faction
from spp_extras_api.utils.loremaster import loremaster, loremaster_earned, misc_lm_criteria
with open(from_root('data/completedQuestCriteria.json'), 'r') as json_file:
    completed_quest_ach_criteria = json.load(json_file)
with open(from_root('data/loremasterAchCriteria.json'), 'r') as json_file:
    loremaster_ach_criteria = json.load(json_file)
with open(from_root('data/sharedAchCriteria.json'), 'r') as json_file:
    shared_ach_criteria = json.load(json_file)
with open(from_root('data/zoneContinents.json'), 'r') as json_file:
    zone_continents = json.load(json_file)


def transfer_ach_prog(accounts, template_quests):
    args = {
        'char_prog_args': [],
        'shared_prog_args': [],
        'new_chars': accounts
    }

    def create_char_prog_args(guid, criteria, counter, date):
        args['char_prog_args'].append({
            'guid': guid,
            'criteria': int(criteria),
            'counter': counter,
            'date': date
        })

    def create_shared_prog_args(acct_id, criteria_id, counter, date):
        args['shared_prog_args'].append({
            'account': acct_id,
            'criteria': int(criteria_id),
            'counter': counter,
            'date': date
        })

    for acct_id in accounts:
        account = accounts[acct_id]
        chars = account['characters']
        credit = account['credit']
        shared_progress = account['shared_progress']
        completed_quests = account['quests']
        loremaster_prog = {
            # Alliance Eastern Kingdoms
            '1676': {'count': 0, 'date': 0000000000},
            # Alliance Kalimdor
            '1678': {'count': 0, 'date': 0000000000},
            # Horde Eastern Kingdoms
            '1677': {'count': 0, 'date': 0000000000},
            # Horde Kalimdor
            '1680': {'count': 0, 'date': 0000000000}
        }

        # Organize all character shared achievement progress by criteria
        new_shared_prog = {}

        def add_to_shared_prog(criteria_id, ach_prog):
            if criteria_id not in new_shared_prog:
                new_shared_prog[criteria_id] = [ach_prog]
            else:
                new_shared_prog[criteria_id].append(ach_prog)

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

            # Add misc Loremaster criteria to loremaster_prog if it exists
            misc_lm_crit = misc_lm_criteria(int(criteria_id))
            if misc_lm_crit:
                loremaster_prog[misc_lm_crit]['count'] += new_count
                if date > loremaster_prog[misc_lm_crit]['date']:
                    loremaster_prog[misc_lm_crit]['date'] = date

            # Transfer shared achievement progress
            create_shared_prog_args(acct_id, criteria_id, new_count, date)

            # Ensure progress counter doesn't exceed threshold
            threshold = shared_ach_criteria[criteria_id]['threshold']
            if new_count > threshold:
                new_count = threshold

            # Check to see if new achievement is earned
            # Add new achievement to all credit
            ach_id = str(shared_ach_criteria[criteria_id]['achievement'])
            if new_count == threshold and ach_id not in credit:
                credit[ach_id] = date

            # Transfer individual character progress
            for char_id in chars:
                char = chars[char_id]
                faction = check_faction(char['race'])
                is_lm_a = misc_lm_crit == '1676' or misc_lm_crit == '1678'
                is_alliance = faction == 'alliance'
                is_alliance_prog = is_lm_a and is_alliance
                is_lm_h = misc_lm_crit == '1677' or misc_lm_crit == '1680'
                is_horde = faction == 'horde'
                is_horde_prog = is_lm_h and is_horde
                if not misc_lm_crit or is_alliance_prog or is_horde_prog:
                    create_char_prog_args(char_id, criteria_id, new_count, date)

        # Run transfers for Loremaster progress
        all_loremaster_prog = loremaster(
            completed_quests, template_quests, loremaster_prog)
        main_lm_prog = all_loremaster_prog['main_prog']
        sub_lm_prog = all_loremaster_prog['sub_prog']
        alliance_lm_prog = sub_lm_prog['alliance']
        horde_lm_prog = sub_lm_prog['horde']

        # Add credit for Loremaster achievements if they exceed threshold
        alliance_ek = main_lm_prog['1676']
        alliance_ek_count = alliance_ek['count']
        alliance_ek_date = alliance_ek['date']
        if loremaster_earned(1676, alliance_ek_count):
            credit['1676'] = alliance_ek_date

        alliance_k = main_lm_prog['1678']
        alliance_k_count = alliance_k['count']
        alliance_k_date = alliance_k['date']
        if loremaster_earned(1678, alliance_k_count):
            credit['1678'] = alliance_k_date

        horde_ek = main_lm_prog['1677']
        horde_ek_count = horde_ek['count']
        horde_ek_date = horde_ek['date']
        if loremaster_earned(1677, horde_ek_count):
            credit['1677'] = horde_ek_date

        horde_k = main_lm_prog['1680']
        horde_k_count = horde_k['count']
        horde_k_date = horde_k['date']
        if loremaster_earned(1680, horde_k_count):
            credit['1680'] = horde_k_date

        # Transfer Loremaster progress for each character
        for char_id in chars:
            char = chars[char_id]
            faction = check_faction(char['race'])
            if faction == 'alliance':
                for criteria_id in alliance_lm_prog:
                    count = alliance_lm_prog[criteria_id]['count']
                    date = alliance_lm_prog[criteria_id]['date']
                    create_char_prog_args(char_id, criteria_id, count, date)
            elif faction == 'horde':
                for criteria_id in horde_lm_prog:
                    count = horde_lm_prog[criteria_id]['count']
                    date = horde_lm_prog[criteria_id]['date']
                    create_char_prog_args(char_id, criteria_id, count, date)

        # Use length of credit for Complete {X} Quests achievement chain
        completed_quest_count = len(completed_quests)
        for criteria_id in completed_quest_ach_criteria:
            criteria = completed_quest_ach_criteria[criteria_id]
            now = datetime.datetime.now()
            date = calendar.timegm(now.timetuple())

            # Ensure progress counter doesn't exceed threshold
            threshold = criteria['threshold']
            if completed_quest_count > threshold:
                completed_quest_count = threshold

            # Check to see if new achievement is earned
            # Add new achievement to all credit
            ach_id = str(criteria['achievement'])
            if completed_quest_count == threshold and ach_id not in credit:
                credit[ach_id] = date

            # Transfer individual character progress
            for char_id in chars:
                create_char_prog_args(
                    char_id, criteria_id, completed_quest_count, date)

        # Add new credit to account
        args['new_chars'][acct_id]['credit'] = credit

    return args

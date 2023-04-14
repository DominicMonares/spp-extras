import functools
import json
from from_root import from_root
with open(from_root('data/factionAchievements.json'), 'r') as json_file:
    faction_achievements = json.load(json_file)
with open(from_root('data/progAchievements.json'), 'r') as json_file:
    prog_achievements = json.load(json_file)
with open(from_root('data/zoneContinents.json'), 'r') as json_file:
    zone_continents = json.load(json_file)


def create_prog_args(all_char_data, template_quest_data):
    args = {
        'char_prog_args': [],
        'shared_prog_args': [],
        'new_prog_args': [], # ?
        'honor_kill_args': []
    }

    for acct_id in all_char_data:
        acct = all_char_data[acct_id]
        chars = acct['characters']
        all_credit = acct['credit']
        all_char_prog = acct['achievement_char_prog']
        all_shared_prog = acct['achievement_shared_prog']
        completed_quests = acct['completed_quests']

        # Organize all char progress by shared prog achievement
        # Only a handful of achievements are selected for sharing
        # See progAchievements.json for selected achievements
        all_prog = {}

        # Find existing progress for each char
        for char_id in all_char_prog:
            char_prog = all_char_prog[char_id]
            for criteria_id in char_prog:
                if criteria_id in prog_achievements:
                    if criteria_id not in all_prog:
                        all_prog[criteria_id] = prog_achievements[criteria_id]
                        all_prog[criteria_id]['counts'] = [char_prog['count']]
                    else:
                        all_prog[criteria_id]['counts'].append(char_prog['count'])

        # Calculate new counts for each shared progress achievement
        for criteria_id in all_prog:
            previous_count = 0
            new_progress = 0

            # Re-assign previous count if shared progress already exists
            acct_shared_exists = acct_id in all_shared_prog
            acct_shared_criteria_exists = criteria_id in all_shared_prog[acct_id]
            if acct_shared_exists and acct_shared_criteria_exists:
                criteria = all_shared_prog[acct_id][criteria_id]
                previous_count = criteria['count']
            
            # Use previous progress for new count calculation
            for c in all_prog[criteria_id]['progress']:
                count = c - previous_count
                if count > 0:
                    new_progress += count
                else:
                    new_progress += c

            new_count = previous_count + new_progress

            # once we have new count
                # add query 



            


        # Make sure you don't add loremaster achievements to wrong faction!

        return
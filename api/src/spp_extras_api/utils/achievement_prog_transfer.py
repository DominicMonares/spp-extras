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

    # Organize all char progress by shared prog achievement
    all_prog = {}

    # iterate through all chars
    # see which prog achievements exist and add them to new dict
    # go through each achievement with char progress
        # subtract shared prog value from each char prog
            # if no shared prog value, set as zero
        # add each of those numbers to find out how many new values there are
        # set new char prog and shared prog

    for acct_id in all_char_data:
        acct = all_char_data[acct_id]
        chars = acct['characters']
        all_char_prog = acct['achievement_char_prog']
        all_shared_prog = acct['achievement_shared_prog']
        completed_quests = acct['completed_quests']

        # Find existing shared achievement progress for each char
        for char_id in all_char_prog:
            char_prog = all_char_prog[char_id]
            for criteria_id in char_prog:
                return
            
        # Make sure you don't add loremaster achievements to wrong faction!

        return
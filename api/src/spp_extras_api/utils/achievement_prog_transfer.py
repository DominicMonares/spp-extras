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
    for chain in prog_achievements:
        if chain == 'bg' or chain == 'lmA' or chain == 'lmH':
            for sub in prog_achievements[chain]:
                return
        else:
            


    for acct_id in all_char_data:
        return
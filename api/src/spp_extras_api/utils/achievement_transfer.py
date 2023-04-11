import json
from from_root import from_root
from spp_extras_api.utils.characters import check_faction
with open(from_root('data/factionAchievements.json'), 'r') as json_file:
    faction_achievements = json.load(json_file)


# Create query arguments for achievement credit and rewards
def create_credit_args(char_data):
    args = {
        'credit_args': [],
        'title_args': [],
        'mail_args': [],
        'mail_item_args': []
    }

    # Iterate through all accounts and characters to check achievements
    for acct_id in char_data:
        chars = char_data[acct_id]['characters']
        credit = char_data[acct_id]['credit']
        for char_id in chars:
            char = chars[char_id]
            faction = check_faction(char['race'])
            char_credit = char['credit']

            # Compare account credit to char credit to see if char has achievement
            # Add credit and reward if not
            for ach_id in credit:
                # Check to see if char has achievement
                existing_ach = char_credit[ach_id]

                # Check to see if achievement is faction specific and matches char faction
                faction_match = False
                faction_ach = faction_achievements[ach_id]
                if faction_ach: 
                    if faction_ach['faction'] == faction:
                        faction_match = True
                    else:
                        faction_match = False
                else:
                    faction_match = True

                # If achievement is valid, transfer credit and rewards
                # if not existing_ach and faction_match:


    return args


# def create_progress_args():
#     return


# def create_title_reward_args():
#     return


# def create_mail_reward_args():
#     return

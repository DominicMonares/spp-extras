import json
from from_root import from_root
from spp_extras_api.models.wotlkcharacters import\
    WotlkCharacterAchievement
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

    ####### TODO: Create return item for rewards to add and to which characters
    ####### so we can split reward logic from credit logic

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

                # Run transfers if achievement is valid
                if not existing_ach and faction_match:
                    # Transfer achievement credit
                    ach_date = credit[ach_id]
                    args['credit_args'].append(WotlkCharacterAchievement(
                        guid = char_id,
                        achievement = ach_id,
                        date = ach_date
                    ))


                    # Transfer reward titles

                    # Transfer reward items
                    

    return args

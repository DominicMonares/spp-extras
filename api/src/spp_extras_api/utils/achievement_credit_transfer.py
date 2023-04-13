import datetime
import json
from from_root import from_root
from spp_extras_api.models.wotlkcharacters import\
    WotlkCharacterAchievement,\
    WotlkCharacters,\
    WotlkItemInstance,\
    WotlkMail,\
    WotlkMailItems
from spp_extras_api.utils.characters import check_faction
with open(from_root('data/factionAchievements.json'), 'r') as json_file:
    faction_achievements = json.load(json_file)
with open(from_root('data/titles.json'), 'r') as json_file:
    titles = json.load(json_file)


# Create query arguments for achievement credit and rewards
def create_credit_args(create_cred_data):
    all_char_data = create_cred_data['all_char_data']
    ach_rewards = create_cred_data['ach_rewards']
    item_charges = create_cred_data['item_charges']
    # Client appears to overwrite database item IDs if they already exist
    # Add 10000 to last ids to prevent client from overwriting for a while
    last_item_inst_id = create_cred_data['last_item_inst_id'] + 10000
    last_mail_id = create_cred_data['last_mail_id'] + 10000

    args = {
        'credit_args': [],
        'item_inst_args': [],
        'mail_args': [],
        'mail_item_args': [],
        'title_args': []
    }

    # Iterate through all accounts and characters to check achievements
    for acct_id in all_char_data:
        chars = all_char_data[acct_id]['characters']
        credit = all_char_data[acct_id]['credit']
        for char_id in chars:
            char = chars[char_id]
            char_credit = char['credit']
            faction = check_faction(char['race'])

            # Compare account credit to char credit to see if char has achievement
            for ach_id in credit:
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

                    # Transfer reward(s) if achievement has reward(s)
                    if ach_rewards[ach_id]:
                        reward_list = ach_rewards[ach_id]
                        reward = reward_list[0]
                        if len(reward_list) > 1: # Handle Matron/Patron
                            reward = reward_list[char['gender']]

                        # Transfer title if achievement rewards one
                        title_id = reward['title_A']
                        if faction == 'horde': title_id = reward['title_H']
                        if title_id:
                            in_game_order = titles[title_id]['inGameOrder']
                            def toNum(n): return int(n)
                            known_titles = map(toNum, char['knowntitles'].split(' '))
                            # Remove empty string created by trailing space
                            known_titles.pop() 

                            # Update known titles
                            title_index = int(str(in_game_order / 32)[0])
                            bit = 2 ** (in_game_order % 32)
                            known_titles[title_index] += bit
                            char['knowntitles'] = ' '.join(known_titles) + ' '

                        # Transfer mail item if achievement rewards one
                        new_date = datetime.datetime.now().strftime('%s')
                        sender = reward['sender']
                        if sender:
                            args['mail_args'].append(WotlkMail(
                                id = last_mail_id,
                                messagetype = 3,
                                stationery = 41,
                                mailtemplateid = 0,
                                sender = sender,
                                receiver = char_id,
                                subject = reward['subject'],
                                body = reward['text'],
                                has_items = 1,
                                expire_time = new_date + 7776000, # 7776000 = 90 days
                                deliver_time = new_date,
                                money = 0,
                                cod = 0,
                                checked = 0
                            ))

                            item = reward['item']
                            if item:
                                args['mail_item_args'].append(WotlkMailItems(
                                    mail_id = last_mail_id,
                                    item_guid = last_item_inst_id,
                                    item_template = item,
                                    receiver = char_id
                                ))

                                args['item_inst_args'].append(WotlkItemInstance(
                                    guid = last_item_inst_id,
                                    owner_guid = char_id,
                                    itementry = item,
                                    creatorguid = 0,
                                    giftcreatorguid = 0,
                                    count = 1,
                                    duration = 0,
                                    charges = f'{item_charges[item]} 0 0 0 0',
                                    flags = 0, #36
                                    enchantments = 36 * '0 ',
                                    randompropertyid = 0,
                                    durability = 0,
                                    playedtime = 0,
                                    text = '',
                                ))

                        # Increment mail reward IDs once item added
                        last_item_inst_id += 1
                        last_mail_id += 1

        # Transfer known titles once all achievement rewards given
        args['title_args'].append({
            char_id: char['knowntitles']
        })

    return args

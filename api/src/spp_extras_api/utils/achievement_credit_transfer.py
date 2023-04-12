import datetime
import json
from from_root import from_root
from spp_extras_api.models.wotlkcharacters import\
    WotlkCharacterAchievement,\
    WotlkItemInstance,\
    WotlkMail,\
    WotlkMailItems
from spp_extras_api.utils.characters import check_faction
with open(from_root('data/factionAchievements.json'), 'r') as json_file:
    faction_achievements = json.load(json_file)


# Create query arguments for achievement credit and rewards
def create_credit_args(create_cred_data):
    all_char_data = create_cred_data['all_char_data']
    ach_rewards = create_cred_data['ach_rewards']
    item_charges = create_cred_data['item_charges']
    # Client appears to overwrite database item IDs if they already exist
    # Add 10000 to last ids to prevent client from overwriting for a while
    last_item_id = create_cred_data['last_item_id'] + 10000
    last_mail_id = create_cred_data['last_mail_id'] + 10000
    mail_items = create_cred_data['mail_items']
    template_quests = create_cred_data['template_quests']

    args = {
        'credit_args': [],
        'item_args': [],
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
            faction = check_faction(char['race'])
            char_credit = char['credit']

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
                        reward = ach_rewards[ach_id]

                        # Transfer title if achievement rewards one
                        title_match = False
                        alliance_title = reward['title_A']
                        horde_title = reward['title_H']
                        if faction == 'alliance' and alliance_title: title_match = True
                        if faction == 'horde' and horde_title: title_match = True

                        # TODO Change title_A and title_H to alliance and horde so it's
                        # easier to match

                        if title_match:
                            def toNum(n): return int(n)
                            known_titles = map(toNum, char['knowntitles'].split(' '))
                            
                            
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
                                    item_guid = last_item_id,
                                    item_template = item,
                                    receiver = char_id
                                ))
                            
                                args['item_args'].append(WotlkItemInstance(
                                    guid = last_item_id,
                                    owner_guid = char_id,
                                    itementry = item,
                                    creatorguid = 0,
                                    giftcreatorguid = 0,
                                    count = 1,
                                    duration = 0,
                                    charges = f'{item_charges[item]} 0 0 0 0',
                                    flags = 0,
                                    enchantments = '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ',
                                    randompropertyid = 0,
                                    durability = 0,
                                    playedtime = 0,
                                    text = '',
                                ))
                        
                        last_item_id = last_item_id + 1
                        last_mail_id = last_mail_id + 1
                    

    return args

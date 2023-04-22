import datetime
import json
import time
from from_root import from_root
from spp_extras_api.models.wotlkcharacters import (
    WotlkCharacterAchievement,
    WotlkItemInstance,
    WotlkMail,
    WotlkMailItems
)
from spp_extras_api.utils.achievements import faction_spef_char_match
from spp_extras_api.utils.characters import check_faction
with open(from_root('data/factionAchievements.json'), 'r') as json_file:
    faction_achievements = json.load(json_file)
with open(from_root('data/titles.json'), 'r') as json_file:
    titles = json.load(json_file)


def transfer_ach_credit(all_chars, ach_rewards, item_charges, last_item_inst_id, last_mail_id):
    # Item IDs appear to be overwritten as new items are added through the game
    # Add 10000 to last ids to prevent items from being overwritten for a while
    last_item_inst_id += 10000
    last_mail_id += 10000

    args = {
        'credit_args': [],
        'item_inst_args': [],
        'mail_args': [],
        'mail_item_args': [],
        'title_args': {}
    }

    def create_credit_args(char_id, ach_id, date):
        args['credit_args'].append(WotlkCharacterAchievement(
            guid=char_id,
            achievement=ach_id,
            date=date))

    def create_item_inst_args(last_item_inst_id, char_id, item, item_charges):
        args['item_inst_args'].append(WotlkItemInstance(
            guid=last_item_inst_id,
            owner_guid=char_id,
            itementry=item,
            creatorguid=0,
            giftcreatorguid=0,
            count=1,
            duration=0,
            charges=f'{item_charges[str(item)]} 0 0 0 0',
            flags=0,
            enchantments=36 * '0 ',
            randompropertyid=0,
            durability=0,
            playedtime=0,
            text=''))

    def create_mail_args(last_mail_id, sender, char_id, reward, new_date):
        args['mail_args'].append(WotlkMail(
            id=last_mail_id,
            messagetype=3,
            stationery=41,
            mailtemplateid=0,
            sender=sender,
            receiver=char_id,
            subject=reward['subject'],
            body=reward['text'],
            has_items=1,
            expire_time=new_date + 7776000,  # 7776000 = 90 days
            deliver_time=new_date,
            money=0,
            cod=0,
            checked=0))

    def create_mail_item_args(last_mail_id, last_item_inst_id, item, char_id):
        args['mail_item_args'].append(WotlkMailItems(
            mail_id=last_mail_id,
            item_guid=last_item_inst_id,
            item_template=item,
            receiver=char_id))

    def run_sub_transfers(char_id, ach_id, date, char, last_item_inst_id, last_mail_id):
        # Transfer achievement credit
        create_credit_args(char_id, ach_id, date)

        # Transfer reward(s) if achievement has reward(s)
        if ach_id in ach_rewards:
            reward_list = ach_rewards[ach_id]
            reward = reward_list[0]
            if len(reward_list) > 1:  # Handle Matron/Patron
                reward = reward_list[char['gender']]

            # Transfer title if achievement rewards one
            title_id = reward['title_a']
            if faction == 'horde':
                title_id = reward['title_h']
            if title_id:
                known_titles = char['knowntitles'].split(' ')
                # Remove empty string created by trailing space
                known_titles.pop()

                # Update known titles
                in_game_order = titles[str(title_id)]['inGameOrder']
                title_index = int(str(in_game_order / 32)[0])
                title_val = int(known_titles[title_index])
                bit = 2 ** (in_game_order % 32)
                known_titles[title_index] = str(title_val + bit)
                char['knowntitles'] = ' '.join(known_titles) + ' '

            # Transfer mail item if achievement rewards one
            now = datetime.datetime.now()
            new_date = time.mktime(now.timetuple())
            sender = reward['sender']
            if sender:
                create_mail_args(last_mail_id, sender,
                                 char_id, reward, new_date)
                item = reward['item']
                if item:
                    create_mail_item_args(
                        last_mail_id, last_item_inst_id, item, char_id)
                    create_item_inst_args(
                        last_item_inst_id, char_id, item, item_charges)

            # Increment mail reward IDs once item added
            last_item_inst_id += 1
            last_mail_id += 1

    # Iterate through all accounts and characters to check achievements
    for acct_id in all_chars:
        chars = all_chars[acct_id]['characters']
        credit = all_chars[acct_id]['credit']
        if chars is not None:
            for char_id in chars:
                char = chars[char_id]
                char_credit = char['credit']
                faction = check_faction(char['race'])
                for ach_id in credit:
                    existing_ach = ach_id in char_credit
                    date = credit[ach_id]

                    # Check to see if achievement is faction specific and matches char faction
                    faction_match = faction_spef_char_match(
                        ach_id, faction, faction_achievements)

                    # Run transfers if achievement is valid
                    if not existing_ach and faction_match:
                        run_sub_transfers(
                            char_id, ach_id, date, char, last_item_inst_id, last_mail_id)

                # Transfer known titles once all achievement rewards given
                args['title_args'][char_id] = char['knowntitles']

    return args

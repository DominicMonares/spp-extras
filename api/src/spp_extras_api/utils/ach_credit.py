import calendar
import datetime
import json
from from_root import from_root
from .achievements import check_faction_ach
from .characters import check_faction
with open(from_root('data/titles/titles.json'), 'r') as json_file:
    titles = json.load(json_file)


def create_ach_credit_args(accounts, ach_rewards, item_charges, last_item_inst_id, last_mail_id):
    # Item IDs appear to be overwritten as new items are added through the game
    # Add 10000 to last ids to prevent items from being overwritten for a while
    last_item_inst_id += 10000
    last_mail_id += 10000

    args = {
        'credit_args': [],
        'item_inst_args': [],
        'mail_args': [],
        'mail_item_args': [],
        'title_args': []
    }

    def add_credit_arg(char_id, ach_id, date):
        args['credit_args'].append({
            'guid': char_id,
            'achievement': ach_id,
            'date': date
        })

    def add_item_inst_arg(last_item_inst_id, char_id, item, item_charges):
        args['item_inst_args'].append({
            'guid': last_item_inst_id,
            'owner_guid': char_id,
            'itementry': item,
            'creatorguid': 0,
            'giftcreatorguid': 0,
            'count': 1,
            'duration': 0,
            'charges': f'{item_charges[str(item)]} 0 0 0 0',
            'flags': 0,
            'enchantments': 36 * '0 ',
            'randompropertyid': 0,
            'durability': 0,
            'playedtime': 0,
            'text': ''
        })

    def add_mail_arg(last_mail_id, sender, char_id, reward, new_date):
        args['mail_args'].append({
            'id': last_mail_id,
            'messagetype': 3,
            'stationery': 41,
            'mailtemplateid': 0,
            'sender': sender,
            'receiver': char_id,
            'subject': reward['subject'],
            'body': reward['text'],
            'has_items': 1,
            'expire_time': new_date + 7776000,  # 7776000 = 90 days
            'deliver_time': new_date,
            'money': 0,
            'cod': 0,
            'checked': 0
        })

    def add_mail_item_arg(last_mail_id, last_item_inst_id, item, char_id):
        args['mail_item_args'].append({
            'mail_id': last_mail_id,
            'item_guid': last_item_inst_id,
            'item_template': item,
            'receiver': char_id
        })

    def add_args(char_id, ach_id, date, char, last_item_inst_id, last_mail_id):
        # Add achievement credit
        add_credit_arg(char_id, ach_id, date)

        # Add reward(s) if achievement has reward(s)
        if ach_id in ach_rewards:
            reward_list = ach_rewards[ach_id]
            matron_patron = len(reward_list) > 1
            gender = char['gender']
            reward = reward_list[gender] if matron_patron else reward_list[0]

            # Add title if achievement rewards one
            title_a = reward['title_a']
            title_h = reward['title_h']
            alliance = faction == 'alliance'
            title_id = title_a if alliance else title_h
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

            # Add mail item if achievement rewards one
            now = datetime.datetime.now()
            new_date = calendar.timegm(now.timetuple())
            sender = reward['sender']
            if sender:
                add_mail_arg(
                    last_mail_id, sender, char_id, reward, new_date)
                item = reward['item']
                if item:
                    add_mail_item_arg(
                        last_mail_id, last_item_inst_id, item, char_id)
                    add_item_inst_arg(
                        last_item_inst_id, char_id, item, item_charges)

    # Iterate through all accounts and characters to check achievements
    for acct_id in accounts:
        chars = accounts[acct_id]['characters']
        credit = accounts[acct_id]['credit']
        if chars is None: continue
        for char_id in chars:
            char = chars[char_id]
            char_credit = char['credit']
            faction = check_faction(char['race'])
            for ach_id in credit:
                existing_ach = ach_id in char_credit
                date = credit[ach_id]
                item_inst_len = len(args['item_inst_args'])
                mail_len = len(args['mail_args'])

                # Check to see if achievement is faction specific/matches char faction
                faction_ach = check_faction_ach(ach_id, faction)
                faction_match = faction_ach[0]
                new_ach_id = faction_ach[1]
                if ach_id != new_ach_id:
                    if new_ach_id in credit: continue

                ach_id = new_ach_id
                existing_ach = ach_id in char_credit

                # Create all char achievement args if achievement is valid
                if not existing_ach and faction_match:
                    add_args(
                        char_id, ach_id, date, char, last_item_inst_id, last_mail_id)

                # Increment mail and item reward IDs for items added
                new_item_inst_len = len(args['item_inst_args'])
                new_mail_len = len(args['mail_args'])
                if new_item_inst_len > item_inst_len:
                    last_item_inst_id += 1
                if new_mail_len > mail_len:
                    last_mail_id += 1

            # Add known titles once all achievement rewards given
            args['title_args'].append({
                'guid': char_id,
                'knowntitles': char['knowntitles']
            })

    return args

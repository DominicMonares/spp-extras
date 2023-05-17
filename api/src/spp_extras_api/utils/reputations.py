import json
from from_root import from_root
with open(from_root('data/reputations/reputationTemplate.json'), 'r') as json_file:
    rep_template = json.load(json_file)


# Organize reputation data by character
def format_reputations(reputations):
    all = {}
    for rep in reputations:
        guid = str(rep['guid'])
        faction = str(rep['faction'])
        standing = rep['standing']
        if guid not in all:
            all[guid] = {}
        all[guid][faction] = standing

    return all


# Share reputation standing between characters
def create_reputation_args(characters, reputations):
    args = []
    acct_standing = {
        'alliance': {},
        'horde': {},
        'neutral': {}
    }

    # Add the highest standing for each rep to acct_standing tracker
    for c in reputations:
        char = reputations[c]
        for faction_id in char:
            standing = char[faction_id]
            if faction_id not in rep_template: continue
            char_faction = rep_template[faction_id]['charFaction']
            if faction_id not in acct_standing[char_faction]:
                acct_standing[char_faction][faction_id] = standing
            elif standing > acct_standing[char_faction][faction_id]:
                acct_standing[char_faction][faction_id] = standing

    # Create arguments for new reputation standings
    for char_faction in characters:
        faction_chars = characters[char_faction]
        for char_id in faction_chars:
            merged_acct_standing = {**acct_standing[char_faction], **acct_standing['neutral']}
            for rep_id in merged_acct_standing:
                standing = merged_acct_standing[rep_id]
                args.append({
                    'guid': int(char_id),
                    'faction': int(rep_id),
                    'standing': standing
                })

    return args

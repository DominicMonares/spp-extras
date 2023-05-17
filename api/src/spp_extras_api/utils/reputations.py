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
def create_reputation_args(accounts, reputations):
    args = []
    for acct_id in accounts:
        account = accounts[acct_id]
        characters = account['characters']
        merged_chars = {**characters['alliance'], **characters['horde']}
        acct_standing = {
            'alliance': {},
            'horde': {},
            'neutral': {}
        }

        # Add the highest standing for each rep to acct_standing tracker
        for char_id in merged_chars:
            if char_id in reputations:
                char_reps = reputations[char_id]
                for faction_id in char_reps:
                    standing = char_reps[faction_id]
                    if faction_id not in rep_template:
                        continue
                    char_faction = rep_template[faction_id]['charFaction']
                    if faction_id not in acct_standing[char_faction]:
                        acct_standing[char_faction][faction_id] = standing
                    elif standing > acct_standing[char_faction][faction_id]:
                        acct_standing[char_faction][faction_id] = standing

        # Create arguments for new reputation standings
        for char_faction in characters:
            faction_chars = characters[char_faction]
            for char_id in faction_chars:
                merged_acct_standing = {
                    **acct_standing[char_faction], **acct_standing['neutral']}
                reps_exist = char_id in reputations
                char_reps = reputations[char_id] if reps_exist else {}
                for rep_id in merged_acct_standing:
                    highest_standing = merged_acct_standing[rep_id]
                    char_reps_exist = rep_id in char_reps
                    char_standing = char_reps[rep_id] if char_reps_exist else 0
                    if highest_standing > char_standing:
                        args.append({
                            'guid': int(char_id),
                            'faction': int(rep_id),
                            'standing': highest_standing
                        })

    return args

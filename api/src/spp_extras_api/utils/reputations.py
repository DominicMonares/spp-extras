import json
from from_root import from_root
with open(from_root('data/reputations/maxRaceReps.json'), 'r') as json_file:
    max_race_reps = json.load(json_file)
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
                char = faction_chars[char_id]
                race = char['race']
                merged_acct_standing = {
                    **acct_standing[char_faction], **acct_standing['neutral']}
                reps_exist = char_id in reputations
                char_reps = reputations[char_id] if reps_exist else {}
                for rep_id in merged_acct_standing:
                    highest_standing = merged_acct_standing[rep_id]
                    char_reps_exist = rep_id in char_reps
                    char_standing = char_reps[rep_id] if char_reps_exist else 0
                    
                    # Prevent race/city rep overflow
                    # Race/city reputations vary depending on char race.
                    # Ex: Orcs start at 1000/6000 with Org and 100/6000 with Thunderbluff
                    # This causes in-game counters to go higher than 999/1000 for these reps
                    # These reps will also not reflect 1:1 in-game for different races
                    # Ex: Orc with 999/1000 Org will transfer to 18499/21000 for Undead char
                    # This ONLY applies to the 10 char race factions
                    # No plans to implement a workaround for this
                    if rep_id in max_race_reps[str(race)]:
                        race_rep = max_race_reps[str(race)][rep_id]
                        max_race_standing = race_rep['maxStanding']
                        if highest_standing > max_race_standing:
                            highest_standing = max_race_standing

                    # Add argument for higher standings
                    if highest_standing > char_standing:
                        args.append({
                            'guid': int(char_id),
                            'faction': int(rep_id),
                            'standing': highest_standing
                        })

    return args

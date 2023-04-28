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


def transfer_reputations(reputations):
    args = []
    progress = {
        'alliance': {},
        'horde': {},
        'neutral': {}
    }

    for c in reputations:
        char = reputations[c]
        for r in char:
            rep = char[r]
            guid = rep['guid']
            faction = rep['faction']
            standing = rep['faction']


    return args

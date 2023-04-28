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

    for char in reputations:
        for rep in reputations[char]:


    return args

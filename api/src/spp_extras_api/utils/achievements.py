def format_achievement_credit(achievements):
    all = {}
    for a in achievements:
        guid = achievements[a['guid']]
        if guid not in all:
            all[str(guid)] = {}
            
        achievement_id = a['achievement']
        all[guid][achievement_id] = a['date']
    
    return all


def format_achievement_progress(achievements):
    all = {}
    for a in achievements:
        guid = achievements[a['guid']]
        if guid not in all:
            all[str(guid)] = {}

        criteria = a['criteria']
        all[guid][criteria] = {
            'counter': a['counter'],
            'date': a['date']
        }
    
    return all

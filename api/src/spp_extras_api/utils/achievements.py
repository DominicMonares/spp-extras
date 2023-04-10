def format_completed_achievements(achievements):
    all = {}
    for a in achievements:
        guid = achievements[a['guid']]
        if guid not in all:
            all[str(guid)] = {}
            
        achievement_id = a['achievement']
        all[guid][achievement_id] = a['date']
    
    return all

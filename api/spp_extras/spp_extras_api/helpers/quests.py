def all_completed_quests(chars, reg, weekly):
    all = {
      'alliance': {},
      'horde': {}
    }
    
    def addQuest(quest, type):
        guid = str(quest['guid'])
        questId = str(quest['quest'])
        faction = chars[guid]

        if not hasattr(all[faction], guid):
            all[faction][guid] = { 'reg': {}, 'weekly': {} }

        if type == 'reg':
            all[faction][guid]['reg'][questId] = quest
        elif type == 'weekly':
            all[faction][guid]['weekly'][questId] = quest

    for q in reg: addQuest(q, 'reg')
    for q in weekly: addQuest(q, 'weekly')
    print(all)
    return all


def all_quests(quests):
    all = {
        'alliance': {},
        'horde': {},
        'both': {}
    }

    alliance = [1, 4, 5, 8, 64, 65, 68, 77, 1101]
    horde = [2, 16, 32, 128, 130, 144, 162, 178, 690]
    both = [0, 255]

    for quest in quests:
        required_races = quest['requiredraces']
        entry = quest['entry']
        if required_races in alliance: all['alliance'][entry] = quest
        elif required_races in horde: all['horde'][entry] = quest
        elif required_races in both: all['both'][entry] = quest
        
    return all

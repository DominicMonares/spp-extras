def allCompletedQuests(chars, reg, weekly):
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
    return all

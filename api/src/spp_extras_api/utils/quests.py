# Combine all completed quests into one object sorted by character
def all_completed_quests(regular, daily, weekly, monthly):
    all = {}

    def add_quest(quest, type):
        guid = str(quest['guid'])
        questId = str(quest['quest'])
        if str(guid) not in all:
            all[str(guid)] = {
                'regular': {},
                'daily': {},
                'weekly': {},
                'monthly': {}
            }

        if type == 'regular':
            all[guid]['regular'][questId] = quest
        elif type == 'daily' and daily:
            all[guid]['daily'][questId] = quest
        elif type == 'weekly':
            all[guid]['weekly'][questId] = quest
        elif type == 'monthly' and monthly:
            all[guid]['monthly'][questId] = quest

    for q in regular:
        add_quest(q, 'regular')
        
    for q in weekly:
        add_quest(q, 'weekly')

    if daily:
        for q in daily:
            add_quest(q, 'daily')

    if monthly:
        for q in monthly:
            add_quest(q, 'monthly')

    return all


# Combine all template quests into one object sorted by faction
def all_template_quests(quests):
    all = {
        'alliance': {},
        'horde': {},
        'both': {}
    }

    alliance = [1, 4, 5, 8, 64, 65, 68, 77, 1101, 1024]
    horde = [2, 16, 32, 128, 130, 144, 162, 176, 178, 512, 514, 690]
    both = [0, 255, 1791]

    for quest in quests:
        required_races = quest['requiredraces']
        entry = str(quest['entry'])
        if required_races in alliance:
            all['alliance'][(entry)] = quest
        elif required_races in horde:
            all['horde'][entry] = quest
        elif required_races in both:
            all['both'][entry] = quest

    return all

import json
from from_root import from_root
with open(from_root('data/zoneContinents.json'), 'r') as json_file:
    zone_continents = json.load(json_file)


def loremaster(completed_quests, template_quests, faction):
    faction_quests = template_quests[faction]
    neutral_quests = template_quests['both']
    all_template_quests = {**faction_quests, **neutral_quests}
    eastern_kingdoms_count = 0
    kalimdor_count = 0

    for quest_id in completed_quests:
        template_quest = all_template_quests[quest_id]
        zoneorsort = str(template_quest['zoneorsort'])
        if zoneorsort in zone_continents:
            continent = zone_continents[zoneorsort]
            if continent == 0:
                eastern_kingdoms_count += 1
            else:
                kalimdor_count += 1

    return [eastern_kingdoms_count, kalimdor_count]
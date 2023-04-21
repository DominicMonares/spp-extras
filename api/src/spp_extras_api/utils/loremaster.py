import json
from from_root import from_root
with open(from_root('data/zoneContinents.json'), 'r') as json_file:
    zone_continents = json.load(json_file)


# See which completed quests belong to which criteria and what their counts are
def loremaster(completed_quests, template_quests, loremaster_prog):
    alliance_template_quests = template_quests['alliance']
    horde_template_quests = template_quests['horde']
    neutral_quests = template_quests['both']
    all_alliance_template_quests = {**alliance_template_quests, **neutral_quests}
    all_horde_template_quests = {**horde_template_quests, **neutral_quests}

    # Track highest counts and most recent dates for main Loremaster quests
    # Use counts from misc Loremaster criteria as a starting point
    alliance_ek = loremaster_prog['alliance_ek']
    alliance_ek_count = alliance_ek['count']
    alliance_ek_date = alliance_ek['date']
    alliance_k = loremaster_prog['alliance_k']
    alliance_k_count = alliance_k['count']
    alliance_k_date = alliance_k['date']
    horde_ek = loremaster_prog['horde_ek']
    horde_ek_count = horde_ek['count']
    horde_ek_date = horde_ek['date']
    horde_k = loremaster_prog['horde_k']
    horde_k_count = horde_k['count']
    horde_k_date = horde_k['date']

    # Track criteria counts for each faction/zone
    all_criteria = {}
    
    for quest_id in completed_quests:
        if quest_id in all_alliance_template_quests:
            

        if quest_id in all_horde_template_quests:



    # for quest_id in completed_quests:
    #     if quest_id in all_template_quests:
    #         template_quest = all_template_quests[quest_id]
    #         zoneorsort = str(template_quest['zoneorsort'])
    #         if zoneorsort in zone_continents:
    #             continent = zone_continents[zoneorsort]
    #             if continent == 0:
    #                 eastern_kingdoms_count += 1
    #             else:
    #                 kalimdor_count += 1

    # return [eastern_kingdoms_count, kalimdor_count]

    # Return list of criteria to add for each char AND totals for each achievement


# Some criteria for Loremaster achievements don't have matching zonerefs or have duplicates
# Progress for these criteria are tracked separately from the other Loremaster criteria
# and are tracked like shared achievements
# There will likely be side-effects to achievements tracked this way since there's no 
# way to check for duplicate progress, but the alternative is risking achievement credit
# not being given on transfer
def misc_lm_criteria(criteria_id):
    alliance_ek = [5903, 5910, 9398, 9424, 5927, 5928, 5940, 5944, 9422]
    alliance_k = [7895, 6017, 6021, 6030]
    horde_ek = [5955, 5962, 9425, 5979, 5980, 5992, 5996, 9423]
    horde_k = [7899, 6112, 6116, 6125]

    if criteria_id in alliance_ek:
        return 'alliance_ek'
    elif criteria_id in alliance_k:
        return 'alliance_k'
    elif criteria_id in horde_ek:
        return 'horde_ek'
    elif criteria_id in horde_k:
        return 'horde_k'

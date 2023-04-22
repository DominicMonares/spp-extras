import json
from from_root import from_root
with open(from_root('data/loremasterAchCriteria.json'), 'r') as json_file:
    lm_criteria = json.load(json_file)
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

    # Track criteria counts and dates for each faction/zone
    all_criteria = {'alliance': {}, 'horde': {}}
    
    for quest_id in completed_quests:
        date = completed_quests[quest_id]
        if quest_id in all_alliance_template_quests:
            template_quest = all_alliance_template_quests[quest_id]
            zone_id = str(template_quest['zoneorsort'])
            zone_criteria = lm_criteria['alliance'][zone_id]
            criteria_id = str(zone_criteria['criteria'])
            ach_id = zone_criteria['achievement']

            # Add counter for criteria if it doesn't exist
            if criteria_id not in all_criteria['alliance']:
                all_criteria['alliance'][criteria_id] = 1
            else:
                all_criteria['alliance'][criteria_id] += 1

            # Add to main counters 
            if ach_id == 1676:
                alliance_ek_count += 1
                if alliance_ek_date < date:
                    alliance_ek_date = date
            elif ach_id == 1678:
                alliance_k_count += 1
                if alliance_k_date < date:
                    alliance_k_date = date

        if quest_id in all_horde_template_quests:
            template_quest = all_horde_template_quests[quest_id]
            zone_id = str(template_quest['zoneorsort'])
            zone_criteria = lm_criteria['horde'][zone_id]
            criteria_id = str(zone_criteria['criteria'])

            # Add counter for criteria if it doesn't exist
            if criteria_id not in all_criteria['horde']:
                all_criteria['horde'][criteria_id] = 1
            else:
                all_criteria['horde'][criteria_id] += 1

            # Add to main counters
            if ach_id == 1677:
                horde_ek_count += 1
                if horde_ek_date < date:
                    horde_ek_date = date
            elif ach_id == 1680:
                horde_k_count += 1
                if horde_k_date < date:
                    horde_k_date = date

    new_loremaster_prog = {
        'alliance_ek': {
            'count': alliance_ek_count,
            'date': alliance_ek_date
        },
        'alliance_k': {
            'count': alliance_k_count,
            'date': alliance_k_date
        },
        'horde_ek': {
            'count': horde_ek_count,
            'date': horde_ek_date
        },
        'horde_k': {
            'count':horde_k_count,
            'date': horde_k_date
        }
    }

    all_progress = {
        'main_prog': new_loremaster_prog,
        'sub_prog': all_criteria
    }
    
    return all_progress


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

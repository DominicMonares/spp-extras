from spp_extras_api.models.classiccharacters import\
    ClassicCharacterQueststatus,\
    ClassicCharacterQueststatusWeekly,\
    ClassicCharacters
from spp_extras_api.models.tbccharacters import\
    TbcCharacterQueststatus,\
    TbcCharacterQueststatusDaily,\
    TbcCharacterQueststatusMonthly,\
    TbcCharacterQueststatusWeekly,\
    TbcCharacters
from spp_extras_api.models.wotlkcharacters import\
    WotlkCharacterQueststatus,\
    WotlkCharacterQueststatusDaily,\
    WotlkCharacterQueststatusMonthly,\
    WotlkCharacterQueststatusWeekly,\
    WotlkCharacters


# Change models depending on expansion

def characters_model(expansion):
    if expansion == 'classic':
        return ClassicCharacters
    elif expansion == 'tbc':
        return TbcCharacters
    else:
        return WotlkCharacters

def regular_quest_model(expansion):
    if expansion == 'classic':
        return ClassicCharacterQueststatus
    elif expansion == 'tbc':
        return TbcCharacterQueststatus
    else:
        return WotlkCharacterQueststatus

def daily_quest_model(expansion):
    if expansion == 'tbc':
        return TbcCharacterQueststatusDaily
    else:
        return WotlkCharacterQueststatusDaily

def weekly_quest_model(expansion):
    if expansion == 'classic':
        return ClassicCharacterQueststatusWeekly
    elif expansion == 'tbc':
        return TbcCharacterQueststatusWeekly
    else:
        return WotlkCharacterQueststatusWeekly

def monthly_quest_model(expansion):
    if expansion == 'tbc':
        return TbcCharacterQueststatusMonthly
    else:
        return WotlkCharacterQueststatusMonthly


# Queries

def sel_all_char_data(expansion):
    return characters_model(expansion).objects\
        .using(f'{expansion}characters')\
        .all()\
        .values(
            'guid', 
            'account', 
            'name', 
            'race', 
            'gender', 
            'class_field', 
            'totalkills', 
            'knowntitles'
        )


def sel_all_completed_reg_quests(expansion):
    return regular_quest_model(expansion).objects\
        .using(f'{expansion}characters')\
        .all()\
        .filter(status__exact=1)\
        .values()


def sel_all_completed_daily_quests(expansion):
    return daily_quest_model(expansion).objects\
        .using(f'{expansion}characters')\
        .all()\
        .values()


def sel_all_completed_weekly_quests(expansion):
    return weekly_quest_model(expansion).objects\
        .using(f'{expansion}characters')\
        .all()\
        .values()


def sel_all_completed_monthly_quests(expansion):
    return monthly_quest_model(expansion).objects\
        .using(f'{expansion}characters')\
        .all()\
        .values()

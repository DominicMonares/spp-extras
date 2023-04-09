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


characters_model = WotlkCharacters
regular_quest_model = WotlkCharacterQueststatus
daily_quest_model = WotlkCharacterQueststatusDaily
weekly_quest_model = WotlkCharacterQueststatusWeekly
monthly_quest_model = WotlkCharacterQueststatusMonthly


# Change models depending on expansion
def set_models(expansion):
    if expansion == 'classic':
        characters_model = ClassicCharacters
        regular_quest_model = ClassicCharacterQueststatus
        weekly_quest_model = ClassicCharacterQueststatusWeekly
    elif expansion == 'tbc':
        characters_model = TbcCharacters
        regular_quest_model = TbcCharacterQueststatus
        daily_quest_model = TbcCharacterQueststatusDaily
        weekly_quest_model = TbcCharacterQueststatusWeekly
        monthly_quest_model = TbcCharacterQueststatusMonthly
    else:
        characters_model = WotlkCharacters
        regular_quest_model = WotlkCharacterQueststatus
        daily_quest_model = WotlkCharacterQueststatusDaily
        weekly_quest_model = WotlkCharacterQueststatusWeekly
        monthly_quest_model = WotlkCharacterQueststatusMonthly


def sel_all_char_data(expansion):
    set_models(expansion)
    return characters_model.objects\
        .using(f'{expansion}characters')\
        .all()\
        .values('guid', 'account', 'name', 'race', 'class_field')


def sel_all_completed_reg_quests(expansion):
    set_models(expansion)
    return regular_quest_model.objects\
        .using(f'{expansion}characters')\
        .all()\
        .filter(status__exact=1)\
        .values()


def sel_all_completed_daily_quests(expansion):
    set_models(expansion)
    return daily_quest_model.objects\
        .using(f'{expansion}characters')\
        .all()\
        .values()


def sel_all_completed_weekly_quests(expansion):
    set_models(expansion)
    return weekly_quest_model.objects\
        .using(f'{expansion}characters')\
        .all()\
        .values()


def sel_all_completed_monthly_quests(expansion):
    set_models(expansion)
    return monthly_quest_model.objects\
        .using(f'{expansion}characters')\
        .all()\
        .values()

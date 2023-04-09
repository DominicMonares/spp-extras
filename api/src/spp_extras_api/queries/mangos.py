import json
from from_root import from_root
from spp_extras_api.models.classicmangos import ClassicQuestTemplate
from spp_extras_api.models.tbcmangos import TbcQuestTemplate
from spp_extras_api.models.wotlkmangos import\
    WotlkAchievementReward,\
    WotlkItemTemplate,\
    WotlkQuestTemplate,\
    WotlkSpellTemplate
with open(from_root('data/cutTitles.json'), 'r') as json_file:
    cut_titles = json.load(json_file)


# Change models depending on expansion

def quest_template_model(expansion):
    if expansion == 'classic':
        return ClassicQuestTemplate
    elif expansion == 'tbc':
        return TbcQuestTemplate
    else:
        return WotlkQuestTemplate


########## Achievement Reward Queries ##########

# All Rewards Query

def sel_all_achievement_rewards():
    return WotlkAchievementReward.objects\
        .using('wotlkmangos')\
        .all()\
        .values()


# Cut Content Queries

def sel_cut_title():
    # Look for 'the Supreme' title to verify
    return WotlkAchievementReward.objects\
        .using('wotlkcharacters')\
        .all()\
        .filter(entry__exact=457)\
        .values()


def ins_cut_titles(): # NEEDS REFACTORING
    WotlkAchievementReward.objects\
        .using('wotlkcharacters')\
        .bulk_create(cut_titles, ignore_conflicts=True)
    

# Item Queries

def sel_item_charges(items): # NEEDS REFACTORING
    return WotlkItemTemplate.objects\
        .using('wotlkcharacters')\
        .values()


# Pet & Mount Queries

def sel_known_template_spells(known_spells): # NEEDS REFACTORING
    return WotlkSpellTemplate.objects\
        .using('wotlkcharacters')\
        .values()


########## Quest Queries ##########

def sel_all_template_quests(expansion):
    return quest_template_model(expansion).objects\
        .using(f'{expansion}mangos')\
        .all()\
        .values(
            'entry',
            'zoneorsort',
            'type',
            'requiredclasses',
            'requiredraces',
            'title',
            'questflags'
        )

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

def sel_all_ach_rewards():
    return WotlkAchievementReward.objects\
        .using('wotlkmangos')\
        .all()\
        .values()


# Cut Title Queries

def sel_cut_title():
    # Look for 'the Supreme' title to verify
    return WotlkAchievementReward.objects\
        .using('wotlkmangos')\
        .all()\
        .filter(entry__exact=457)\
        .count()


def ins_cut_titles():
    cut_title_params = []
    for t in cut_titles:
        cut_title_params.append(WotlkAchievementReward(
            entry = t['achievement'],
            gender = 2,
            title_a = t['title_A'],
            title_h = t['title_H'],
            item = 0,
            sender = 0,
            subject = None,
            text = None
        ))

    WotlkAchievementReward.objects\
        .using('wotlkmangos')\
        .bulk_create(cut_title_params, ignore_conflicts=True)


# Item Queries

def sel_rew_item_charges(items):
    return WotlkItemTemplate.objects\
        .using('wotlkmangos')\
        .filter(entry__in=items)\
        .values('entry', 'spellcharges_1')


# Pet & Mount Queries

def sel_known_template_spells(known_spells): # NEEDS REFACTORING
    return WotlkSpellTemplate.objects\
        .using('wotlkmangos')\
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

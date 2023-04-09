from spp_extras_api.models.classicmangos import ClassicQuestTemplate
from spp_extras_api.models.tbcmangos import TbcQuestTemplate
from spp_extras_api.models.wotlkmangos import WotlkQuestTemplate


# Change models depending on expansion

def quest_template_model(expansion):
    if expansion == 'classic':
        return ClassicQuestTemplate
    elif expansion == 'tbc':
        return TbcQuestTemplate
    else:
        return WotlkQuestTemplate


# Queries

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

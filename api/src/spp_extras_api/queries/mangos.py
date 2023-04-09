from spp_extras_api.models.classicmangos import ClassicQuestTemplate
from spp_extras_api.models.tbcmangos import TbcQuestTemplate
from spp_extras_api.models.wotlkmangos import WotlkQuestTemplate


quest_template_model = WotlkQuestTemplate


# Change models depending on expansion
def set_models(expansion):
    if expansion == 'classic':
        quest_template_model = ClassicQuestTemplate
    elif expansion == 'tbc':
        quest_template_model = TbcQuestTemplate
    else:
        quest_template_model = WotlkQuestTemplate


def sel_all_template_quests(expansion):
    set_models(expansion)
    return quest_template_model.objects\
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

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.utils import OperationalError
from spp_extras_api.models.classiccharacters import\
    ClassicCharacterQueststatus,\
    ClassicCharacterQueststatusWeekly,\
    ClassicCharacters
from spp_extras_api.models.classicmangos import ClassicQuestTemplate
from spp_extras_api.models.classicrealmd import ClassicAccount
from spp_extras_api.models.tbccharacters import\
    TbcCharacterQueststatus,\
    TbcCharacterQueststatusDaily,\
    TbcCharacterQueststatusMonthly,\
    TbcCharacterQueststatusWeekly,\
    TbcCharacters
from spp_extras_api.models.tbcmangos import TbcQuestTemplate
from spp_extras_api.models.tbcrealmd import TbcAccount
from spp_extras_api.models.wotlkcharacters import \
    WotlkCharacterQueststatus,\
    WotlkCharacterQueststatusDaily,\
    WotlkCharacterQueststatusMonthly,\
    WotlkCharacterQueststatusWeekly,\
    WotlkCharacters
from spp_extras_api.models.wotlkmangos import WotlkQuestTemplate
from spp_extras_api.models.wotlkrealmd import WotlkAccount
from spp_extras_api.queries.characters import get_all_character_data
# from spp_extras_api.queries.mangos import get_all_character_data
from spp_extras_api.queries.realmd import get_all_account_data
from spp_extras_api.utils.characters import all_characters
from spp_extras_api.utils.quests import all_completed_quests, all_template_quests


class DataViewSet(viewsets.ViewSet):
    @action(methods=['GET'], detail=False)
    def all(self, request):
        expansion = request.GET.get('expansion')
        account_model = {}
        characters_model = {}
        regular_quest_model = {}
        daily_quest_model = {}
        weekly_quest_model = {}
        monthly_quest_model = {}
        quest_template_model = {}

        if expansion == 'classic':
            account_model = ClassicAccount
            characters_model = ClassicCharacters
            regular_quest_model = ClassicCharacterQueststatus
            weekly_quest_model = ClassicCharacterQueststatusWeekly
            quest_template_model = ClassicQuestTemplate
        elif expansion == 'tbc':
            account_model = TbcAccount
            characters_model = TbcCharacters
            regular_quest_model = TbcCharacterQueststatus
            daily_quest_model = TbcCharacterQueststatusDaily
            weekly_quest_model = TbcCharacterQueststatusWeekly
            monthly_quest_model = TbcCharacterQueststatusMonthly
            quest_template_model = TbcQuestTemplate
        elif expansion == 'wotlk':
            account_model = WotlkAccount
            characters_model = WotlkCharacters
            regular_quest_model = WotlkCharacterQueststatus
            daily_quest_model = WotlkCharacterQueststatusDaily
            weekly_quest_model = WotlkCharacterQueststatusWeekly
            monthly_quest_model = WotlkCharacterQueststatusMonthly
            quest_template_model = WotlkQuestTemplate

        try:
            # Fetch all account data
            accounts = get_all_account_data(expansion, account_model)

            # Fetch all  character data
            characters = get_all_character_data(expansion, characters_model)

            # Fetch all completed regular quest data
            completed_regular = regular_quest_model.objects\
                .using(f'{expansion}characters')\
                .all()\
                .filter(status__exact=1)\
                .values()

            # Fetch all completed daily quest data
            completed_daily = []
            if expansion == 'tbc' or expansion == 'wotlk':
                completed_daily = daily_quest_model.objects\
                    .using(f'{expansion}characters')\
                    .all()\
                    .values()

            # Fetch all completed weekly quest data
            completed_weekly = weekly_quest_model.objects\
                .using(f'{expansion}characters')\
                .all()\
                .values()

            # Fetch all completed monthly quest data
            completed_monthly = []
            if expansion == 'tbc' or expansion == 'wotlk':
                completed_monthly = monthly_quest_model.objects\
                    .using(f'{expansion}characters')\
                    .all()\
                    .values()

            # Fetch template quests
            template_quests = quest_template_model.objects\
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

            # Organize all fetched data
            all_data = {
                'characters': all_characters(accounts, characters),
                'completed_quests': all_completed_quests(
                    characters,
                    completed_regular,
                    completed_daily,
                    completed_weekly,
                    completed_monthly
                ),
                'template_quests': all_template_quests(template_quests)
            }

            # Send response with character and account data, filtered by faction
            return Response(
                status=status.HTTP_200_OK,
                data=all_data
            )
        except OperationalError:
            return Response(
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                data={'message': 'Failed to retrieve data...'}
            )
        except Exception as e:
            return Response(
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                data={'message': f'Server error: {e["message"]}'}
            )
        except:
            return Response(
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                data={'message': 'Something weird happened!'}
            )

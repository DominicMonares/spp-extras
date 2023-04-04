from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.utils import OperationalError
from spp_extras_api.models.classiccharacters import\
    ClassicCharacterQueststatus,\
    ClassicCharacterQueststatusWeekly
from spp_extras_api.models.classicmangos import ClassicQuestTemplate
from spp_extras_api.models.tbccharacters import\
    TbcCharacterQueststatus,\
    TbcCharacterQueststatusDaily,\
    TbcCharacterQueststatusWeekly,\
    TbcCharacterQueststatusMonthly
from spp_extras_api.models.tbcmangos import TbcQuestTemplate
from spp_extras_api.models.wotlkcharacters import\
    WotlkCharacterQueststatus,\
    WotlkCharacterQueststatusDaily,\
    WotlkCharacterQueststatusWeekly,\
    WotlkCharacterQueststatusMonthly
from spp_extras_api.models.wotlkmangos import WotlkQuestTemplate
from spp_extras_api.utils.quests import all_completed_quests, all_template_quests


class QuestViewSet(viewsets.ViewSet):
    @action(methods=['GET'], detail=False)
    # Get completed quests from all characters
    def completed(self, request):
        expansion = request.GET.get('expansion')
        characters = request.GET.get('characters').split(',')
        regular_quest_model = {}
        daily_quest_model = {}
        weekly_quest_model = {}
        monthly_quest_model = {}

        if expansion == 'classic':
            regular_quest_model = ClassicCharacterQueststatus
            weekly_quest_model = ClassicCharacterQueststatusWeekly
        elif expansion == 'tbc':
            regular_quest_model = TbcCharacterQueststatus
            daily_quest_model = TbcCharacterQueststatusDaily
            weekly_quest_model = TbcCharacterQueststatusWeekly
            monthly_quest_model = TbcCharacterQueststatusMonthly
        elif expansion == 'wotlk':
            regular_quest_model = WotlkCharacterQueststatus
            daily_quest_model = WotlkCharacterQueststatusDaily
            weekly_quest_model = WotlkCharacterQueststatusWeekly
            monthly_quest_model = WotlkCharacterQueststatusMonthly

        try:
            # Split and organize char guid and faction based on string sent from client
            # 'guid, faction, guid, faction, ...'
            chars = {}
            for i, c in enumerate(characters):
                if i % 2 == 1:
                    continue
                chars[c] = characters[int(i) + 1]

            charIds = chars.keys()

            # Fetch all completed quest data for all quest types
            completed_regular = regular_quest_model.objects\
                .using(f'{expansion}characters')\
                .filter(guid__in=charIds, status=1)\
                .values()

            completed_daily = []
            if expansion == 'tbc' or expansion == 'wotlk':
                completed_daily = daily_quest_model.objects\
                    .using(f'{expansion}characters')\
                    .filter(guid__in=charIds)\
                    .values()

            completed_weekly = weekly_quest_model.objects\
                .using(f'{expansion}characters')\
                .filter(guid__in=charIds)\
                .values()

            completed_monthly = []
            if expansion == 'tbc' or expansion == 'wotlk':
                completed_monthly = monthly_quest_model.objects\
                    .using(f'{expansion}characters')\
                    .filter(guid__in=charIds)\
                    .values()

            # Organize quest data by faction and character and send to client
            all_completed = all_completed_quests(
                chars,
                completed_regular,
                completed_daily,
                completed_weekly,
                completed_monthly
            )

            return Response(
                status=status.HTTP_200_OK,
                data=all_completed
            )
        except OperationalError:
            return Response(
                status=status.HTTP_500_INTERNAL_SERVER_ERROR, 
                data={'message': 'Failed to retrieve completed quests data...'}
            )
        except Exception as e:
            return Response(
                status=status.HTTP_500_INTERNAL_SERVER_ERROR, 
                data={'message': f'Server error: {e.message}'}
            )
        except:
            return Response(
                status=status.HTTP_500_INTERNAL_SERVER_ERROR, 
                data={'message': 'Something weird happened!'}
            )

    @action(methods=['GET'], detail=False)
    # Get all quests from world database
    def all(self, request):
        expansion = request.GET.get('expansion')
        quest_template_model = {}

        if expansion == 'classic':
            quest_template_model = ClassicQuestTemplate
        elif expansion == 'tbc':
            quest_template_model = TbcQuestTemplate
        elif expansion == 'wotlk':
            quest_template_model = WotlkQuestTemplate

        try:
            # Fetch template quests
            quests = quest_template_model.objects\
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

            # Send response with template quest data, filtered by faction
            return Response(
                status=status.HTTP_200_OK,
                data=all_template_quests(quests)
            )
        except OperationalError:
            return Response(
                status=status.HTTP_500_INTERNAL_SERVER_ERROR, 
                data={'message': 'Failed to retrieve template quest data...'}
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

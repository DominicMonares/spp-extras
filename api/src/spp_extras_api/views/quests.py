from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response 
from spp_extras_api.models.classiccharacters import CharacterQueststatus, CharacterQueststatusWeekly
from spp_extras_api.models.classicmangos import QuestTemplate
from spp_extras_api.utils.quests import all_completed_quests, all_quests


class QuestViewSet(viewsets.ViewSet):
    @action(methods=['GET'], detail=False)
    # Get completed quests from all characters
    def completed(self, request):
        expansion = request.GET.get('expansion')
        characters = request.GET.get('characters').split(',')
        chars = {}

        for i, c in enumerate(characters):
            if i % 2 == 1:
                continue
            chars[c] = characters[int(i) + 1]

        charIds = chars.keys()

        completedRegular = CharacterQueststatus.objects\
            .using(f'{expansion}characters')\
            .filter(guid__in=charIds, status=1)\
            .values()

        completedWeekly = CharacterQueststatusWeekly.objects\
            .using(f'{expansion}characters')\
            .filter(guid__in=charIds)\
            .values()

        all_completed = all_completed_quests(
            chars,
            completedRegular,
            completedWeekly
        )

        return Response(
            status=status.HTTP_200_OK,
            data=all_completed
        )

    @action(methods=['GET'], detail=False)
    # Get all quests from world database
    def all(self, request):
        expansion = request.GET.get('expansion')

        quests = QuestTemplate.objects\
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

        return Response(
            status=status.HTTP_200_OK,
            data=all_quests(quests)
        )

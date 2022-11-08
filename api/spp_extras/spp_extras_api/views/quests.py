# Rest Framework
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response

# Models
from spp_extras_api.models.classiccharacters import CharacterQueststatus
from spp_extras_api.models.classiccharacters import CharacterQueststatusWeekly

# Helpers
from spp_extras_api.helpers.quests import allCompletedQuests


class QuestViewSet(viewsets.ViewSet):
    @action(methods=['GET'], detail=False)
    # Get completed quests from all characters
    def completed(self, request):
        expansion = request.GET.get('expansion')
        characters = request.GET.get('chars').split(',')
        chars = {}

        for i, c in enumerate(characters):
            if i % 2 == 1: continue
            chars[c] = characters[int(i) + 1]

        charIds = chars.keys()
        
        completedReg = CharacterQueststatus.objects\
            .using(f'{expansion}characters')\
            .filter(guid__in=charIds)\
            .values()

        completedWeekly = CharacterQueststatusWeekly.objects\
            .using(f'{expansion}characters')\
            .filter(guid__in=charIds)\
            .values()

        allCompleted = allCompletedQuests(
            chars, 
            completedReg, 
            completedWeekly
        )

        return Response(
            status=status.HTTP_200_OK, 
            data=allCompleted
        )
    
    # Get all quests from world database
    def all(self, request):
        expansion = request.GET.get('expansion')

        print(expansion)

        return Response(
            status=status.HTTP_200_OK, 
            data=expansion
        )

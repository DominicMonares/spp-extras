# Rest Framework
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response

# Models
from spp_extras_api.models.classiccharacters import CharacterQueststatus
from spp_extras_api.models.classiccharacters import CharacterQueststatusWeekly

# Helpers
from spp_extras_api.helpers.quests import allQuests

class QuestViewSet(viewsets.ViewSet):
    @action(methods=['GET'], detail=False)
    # Get completed quests from all characters
    def completed(self, request):
        expansion = request.GET.get('expansion')
        charIds = request.GET.get('charIds').split(',')
        charIds = list(map(lambda c: int(c), charIds))
        
        completedQuests = CharacterQueststatus.objects\
            .using(f'{expansion}characters')\
            .filter(guid__in=charIds)\
            .values()

        completedWeeklyQuests = CharacterQueststatusWeekly.objects\
            .using(f'{expansion}characters')\
            .filter(guid__in=charIds)\
            .values()

        print(f'TEST {completedWeeklyQuests}')

        # get all quests from world db

        # call helper with all, completed, and weekly_completed
        # return that dict


        return Response(
            status=status.HTTP_200_OK, 
            data=expansion
        )
    
    # Get all quests from world database
    def all(self, request):
        expansion = request.GET.get('expansion')

        print(expansion)

        return Response(
            status=status.HTTP_200_OK, 
            data=expansion
        )

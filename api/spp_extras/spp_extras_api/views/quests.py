# Rest Framework
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response

# Models
from spp_extras_api.models.classiccharacters import CharacterQueststatus
from spp_extras_api.models.classiccharacters import CharacterQueststatusWeekly


class QuestViewSet(viewsets.ViewSet):
    @action(methods=['GET'], detail=False)
    def completed(self, request):
        expansion = request.GET.get('expansion')
        characters = request.GET.get('characters')

        print(characters)

        return Response(
            status=status.HTTP_200_OK, 
            data=expansion
        )
    
    def all(self, request):
        expansion = request.GET.get('expansion')

        print(expansion)

        return Response(
            status=status.HTTP_200_OK, 
            data=expansion
        )

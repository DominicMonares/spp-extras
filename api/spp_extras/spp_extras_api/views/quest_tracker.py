from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response


class QuestTrackerViewSet(viewsets.ViewSet):
    @action(methods=['GET'], detail=False, name='Get Value from input')
    def all(self, request):
        input = request.GET.get('input')

        print(input)

        return Response(
            status=status.HTTP_200_OK, 
            data=input
        )

from django.shortcuts import render
from datetime import datetime
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response

from spp_extras_api.models.realmd import Account
from spp_extras_api.models.characters import Characters
from spp_extras_api.helpers.accounts import account_ids


class QuestTrackerViewSet(viewsets.ViewSet):
    @action(methods=['GET'], detail=False, name='Get Value from input')
    def all(self, request):
        input = request.GET.get('input')

        accounts = Account.objects.using('realmd').exclude(username__contains='RNDBOT').values()
        ids = list(map(account_ids, accounts))
        print(f'IDSSSSSSSS: {ids}')
        characters = Characters.objects.using('characters').filter(account__in=ids).values()
        print(f'CHARACTERSSSSSSSSS: {characters}')

        return Response(
            status=status.HTTP_200_OK, 
            data=characters
        )


class TestViewSet(viewsets.ViewSet):
    @action(methods=['GET'], detail=False, name='Get Value from input')
    def test(self, request):
        input = request.GET.get('input')

        return Response(
            status=status.HTTP_200_OK,
            data=f"[{ datetime.now() }] input={ input }, value from TEST"
        )

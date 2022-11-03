# Rest Framework
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response

# Models
from spp_extras_api.models.realmd import Account
from spp_extras_api.models.characters import Characters

# Helpers
from spp_extras_api.helpers.characters import get_account_ids, all_characters


class CharactersViewSet(viewsets.ViewSet):
    @action(methods=['GET'], detail=False, name='Get Value from input')
    def all(self, request):
        input = request.GET.get('input') # will be used for selected expansion

        accounts = Account.objects\
            .using('realmd')\
            .exclude(username__contains='RNDBOT')\
            .values('id', 'username')

        account_ids = list(map(get_account_ids, accounts))
        
        characters = Characters.objects\
            .using('characters')\
            .filter(account__in=account_ids)\
            .values('guid', 'account', 'name', 'race', 'class_field')

        return Response(
            status=status.HTTP_200_OK, 
            data=all_characters(accounts, characters)
        )
        
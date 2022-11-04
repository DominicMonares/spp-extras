# Rest Framework
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response

# Models
from spp_extras_api.models.classicrealmd import Account
from spp_extras_api.models.classiccharacters import Characters

# Helpers
from spp_extras_api.helpers.characters import get_account_ids, all_characters


class CharactersViewSet(viewsets.ViewSet):
    @action(methods=['GET'], detail=False, name='Get Value from input')
    def all(self, request):
        input = request.GET.get('expansion')

        accounts = Account.objects\
            .using(f'{input}realmd')\
            .exclude(username__contains='RNDBOT')\
            .values('id', 'username')

        account_ids = list(map(get_account_ids, accounts))
        
        characters = Characters.objects\
            .using(f'{input}characters')\
            .filter(account__in=account_ids)\
            .values('guid', 'account', 'name', 'race', 'class_field')

        return Response(
            status=status.HTTP_200_OK, 
            data=all_characters(accounts, characters)
        )
        
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from spp_extras_api.models.classicrealmd import Account
from spp_extras_api.models.classiccharacters import Characters
from spp_extras_api.utils.characters import get_account_ids, all_characters


class CharactersViewSet(viewsets.ViewSet):
    @action(methods=['GET'], detail=False)
    def all(self, request):
        expansion = request.GET.get('expansion')

        accounts = Account.objects\
            .using(f'{expansion}realmd')\
            .exclude(username__contains='RNDBOT')\
            .values('id', 'username')

        account_ids = list(map(get_account_ids, accounts))
        
        characters = Characters.objects\
            .using(f'{expansion}characters')\
            .filter(account__in=account_ids)\
            .values('guid', 'account', 'name', 'race', 'class_field')

        return Response(
            status=status.HTTP_200_OK, 
            data=all_characters(accounts, characters)
        )
        
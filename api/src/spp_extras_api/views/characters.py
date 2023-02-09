from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from spp_extras_api.models.classicrealmd import ClassicAccount
from spp_extras_api.models.classiccharacters import ClassicCharacters
from spp_extras_api.models.tbcrealmd import TbcAccount
from spp_extras_api.models.tbccharacters import TbcCharacters
from spp_extras_api.models.wotlkrealmd import WotlkAccount
from spp_extras_api.models.wotlkcharacters import WotlkCharacters
from spp_extras_api.utils.characters import get_account_ids, all_characters


class CharactersViewSet(viewsets.ViewSet):
    @action(methods=['GET'], detail=False)
    def all(self, request):
        expansion = request.GET.get('expansion')
        accountModel = {}
        charactersModel = {}

        if expansion == 'classic':
            accountModel = ClassicAccount
            charactersModel = ClassicCharacters
        elif expansion == 'tbc': 
            accountModel = TbcAccount
            charactersModel = TbcCharacters
        elif expansion == 'wotlk':
            accountModel = WotlkAccount
            charactersModel = WotlkCharacters

        accounts = accountModel.objects\
            .using(f'{expansion}realmd')\
            .exclude(username__contains='RNDBOT')\
            .values('id', 'username')

        account_ids = list(map(get_account_ids, accounts))
        
        characters = charactersModel.objects\
            .using(f'{expansion}characters')\
            .filter(account__in=account_ids)\
            .values('guid', 'account', 'name', 'race', 'class_field')

        return Response(
            status=status.HTTP_200_OK, 
            data=all_characters(accounts, characters)
        )
        
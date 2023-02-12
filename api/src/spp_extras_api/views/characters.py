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
        account_model = {}
        characters_model = {}

        if expansion == 'classic':
            account_model = ClassicAccount
            characters_model = ClassicCharacters
        elif expansion == 'tbc': 
            account_model = TbcAccount
            characters_model = TbcCharacters
        elif expansion == 'wotlk':
            account_model = WotlkAccount
            characters_model = WotlkCharacters

        accounts = account_model.objects\
            .using(f'{expansion}realmd')\
            .exclude(username__contains='RNDBOT')\
            .values('id', 'username')

        account_ids = list(map(get_account_ids, accounts))
        
        characters = characters_model.objects\
            .using(f'{expansion}characters')\
            .filter(account__in=account_ids)\
            .values('guid', 'account', 'name', 'race', 'class_field')

        return Response(
            status=status.HTTP_200_OK, 
            data=all_characters(accounts, characters)
        )
        
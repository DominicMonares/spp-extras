from asgiref.sync import sync_to_async
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.utils import OperationalError
from spp_extras_api.models.classicrealmd import ClassicAccount
from spp_extras_api.models.classiccharacters import ClassicCharacters
from spp_extras_api.models.tbcrealmd import TbcAccount
from spp_extras_api.models.tbccharacters import TbcCharacters
from spp_extras_api.models.wotlkrealmd import WotlkAccount
from spp_extras_api.models.wotlkcharacters import WotlkCharacters
from spp_extras_api.utils.characters import get_account_id, all_characters


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
            
        try:
            # Fetch all player account data, excluding random bot accounts
            accounts = account_model.objects\
                .using(f'{expansion}realmd')\
                .exclude(username__contains='RNDBOT')\
                .values('id', 'username')

            account_ids = list(map(get_account_id, accounts))
        
            # Fetch all player character data
            characters = characters_model.objects\
                .using(f'{expansion}characters')\
                .filter(account__in=account_ids)\
                .values('guid', 'account', 'name', 'race', 'class_field')

            # Send response with character and account data, filtered by faction
            return Response(
                status=status.HTTP_200_OK, 
                data=all_characters(accounts, characters)
            )
        except OperationalError:
            return Response(
                status=status.HTTP_500_INTERNAL_SERVER_ERROR, 
                data={'message': 'Failed to connect to database...'}
            )
        except Exception as e:
            return Response(
                status=status.HTTP_500_INTERNAL_SERVER_ERROR, 
                data={'message': f'Server error: {e.message}'}
            )
        except:
            return Response(
                status=status.HTTP_500_INTERNAL_SERVER_ERROR, 
                data={'message': 'Something weird happened!'}
            )
            
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.utils import OperationalError
from spp_extras_api.queries.characters import\
    sel_all_char_data,\
    sel_all_completed_daily_quests,\
    sel_all_completed_monthly_quests,\
    sel_all_completed_reg_quests,\
    sel_all_completed_weekly_quests
from spp_extras_api.queries.mangos import sel_all_template_quests
from spp_extras_api.queries.realmd import sel_all_account_data
from spp_extras_api.utils.characters import all_characters
from spp_extras_api.utils.quests import all_completed_quests, all_template_quests


class DataViewSet(viewsets.ViewSet):
    @action(methods=['GET'], detail=False)
    def all(self, request):
        expansion = request.GET.get('expansion')

        try:
            # Fetch all account and character data
            accounts = sel_all_account_data(expansion)
            characters = sel_all_char_data(expansion)

            # Fetch all completed regular quest data
            completed_regular = sel_all_completed_reg_quests(expansion)

            # Fetch all completed daily quest data
            completed_daily = []
            if expansion == 'tbc' or expansion == 'wotlk':
                completed_daily = sel_all_completed_daily_quests(expansion)

            # Fetch all completed weekly quest data
            completed_weekly = sel_all_completed_weekly_quests(expansion)

            # Fetch all completed monthly quest data
            completed_monthly = []
            if expansion == 'tbc' or expansion == 'wotlk':
                completed_monthly = sel_all_completed_monthly_quests(expansion)

            # Fetch template quests
            template_quests = sel_all_template_quests(expansion)

            # Organize all fetched data
            all_data = {
                'characters': all_characters(accounts, characters),
                'completed_quests': all_completed_quests(
                    completed_regular,
                    completed_daily,
                    completed_weekly,
                    completed_monthly
                ),
                'template_quests': all_template_quests(template_quests)
            }

            # Send response with character and account data, filtered by faction
            return Response(
                status=status.HTTP_200_OK,
                data=all_data
            )
        except OperationalError:
            return Response(
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                data={'message': 'Failed to retrieve data...'}
            )
        except Exception as e:
            return Response(
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                data={'message': f'Server error: {e["message"]}'}
            )
        except:
            return Response(
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                data={'message': 'Something weird happened!'}
            )

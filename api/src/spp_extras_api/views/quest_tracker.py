from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.utils import OperationalError
from spp_extras_api.queries.characters import (
    sel_all_chars,
    sel_all_completed_daily_quests,
    sel_all_completed_monthly_quests,
    sel_all_completed_reg_quests,
    sel_all_completed_weekly_quests
)
from spp_extras_api.queries.mangos import sel_all_template_quests
from spp_extras_api.queries.realmd import sel_all_accounts
from spp_extras_api.utils.characters import format_accts_n_chars
from spp_extras_api.utils.quests import (
    format_completed_quests,
    format_template_quests
)

class DataViewSet(viewsets.ViewSet):
    @action(methods=['GET'], detail=False)
    def all(self, request):
        expansion = request.GET.get('expansion')

        def send_res(data):
            print('All Quest Tracker data fetched and formatted!')
            return Response(
                status=status.HTTP_200_OK,
                data=data)

        def send_err(msg):
            print(msg)
            return Response(
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                data={'message': f'Server error: {msg}'})

        # ----------------------------------------------------------------
        # Fetch all data
        # ----------------------------------------------------------------

        # Fetch all account data
        try:
            print('Fetching account data...')
            account_data = sel_all_accounts(expansion)
            print('Account data successfully fetched!')
        except Exception as e:
            return send_err('Failed to fetch account data!')

        # Fetch all character data
        try:
            print('Fetching character data...')
            character_data = sel_all_chars(expansion)
            print('Character data successfully fetched!')
        except Exception as e:
            return send_err('Failed to fetch character data!')

        # Fetch all completed regular quest data
        try:
            print('Fetching completed regular quest data...')
            completed_reg_data = sel_all_completed_reg_quests(expansion)
            print('Completed regular quest data successfully fetched!')
        except Exception as e:
            return send_err('Failed to fetch completed regular quest data!')

        # Fetch all completed daily quest data
        completed_daily_data = []
        if expansion == 'tbc' or expansion == 'wotlk':
            try:
                print('Fetching completed daily quest data...')
                completed_daily_data = sel_all_completed_daily_quests(expansion)
                print('Completed daily quest data successfully fetched!')
            except Exception as e:
                return send_err('Failed to fetch completed daily quest data!')

        # Fetch all completed weekly quest data
        try:
            print('Fetching completed weekly quest data...')
            completed_weekly_data = sel_all_completed_weekly_quests(expansion)
            print('Completed weekly quest data successfully fetched!')
        except Exception as e:
            return send_err('Failed to fetch completed weekly quest data!')

        # Fetch all completed monthly quest data
        completed_monthly_data = []
        if expansion == 'tbc' or expansion == 'wotlk':
            try:
                print('Fetching completed monthly quest data...')
                completed_monthly_data = sel_all_completed_monthly_quests(expansion)
                print('Completed monthly quest data successfully fetched!')
            except Exception as e:
                return send_err('Failed to fetch completed monthly quest data!')

        # Send error if no quests exist
        regs_exist = len(completed_reg_data) > 1
        dailies_exist = len(completed_daily_data) > 1
        weeklies_exist = len(completed_weekly_data) > 1
        monthlies_exist = len(completed_monthly_data) > 1
        if not regs_exist or not dailies_exist or not weeklies_exist or not monthlies_exist:
            return send_err('No completed quests exist!')

        # Fetch all template quest data
        try:
            print('Fetching template quest data...')
            template_quest_data = sel_all_template_quests(expansion)
            print('Template quest data successfully fetched!')
        except Exception as e:
            return send_err('Failed to fetch template quest data!')
        
        # ----------------------------------------------------------------
        # Format data
        # ----------------------------------------------------------------

        # Format account and character data
        accounts = format_accts_n_chars(account_data, character_data)

        # Format all completed quest data
        completed_quests = format_completed_quests(
            completed_reg_data,
            completed_daily_data,
            completed_weekly_data,
            completed_monthly_data)
        
        # Format template quest data
        template_quests = format_template_quests(template_quest_data)

        # Combine all data
        all_data = {
            'accounts': accounts,
            'completed_quests': completed_quests,
            'template_quests': template_quests
        }

        # Send response with character and account data, filtered by faction
        return send_res(all_data)
        

        # try:
            # Fetch all account and character data
            # accounts = sel_all_accounts(expansion)
            # characters = sel_all_chars(expansion)
            # Fetch all completed regular quest data
            # completed_regular = sel_all_completed_reg_quests(expansion)
            # Fetch all completed daily quest data
            # completed_daily = []
            # if expansion == 'tbc' or expansion == 'wotlk':
            #     completed_daily = sel_all_completed_daily_quests(expansion)

            # Fetch all completed weekly quest data
            # completed_weekly = sel_all_completed_weekly_quests(expansion)

            # Fetch all completed monthly quest data
            # completed_monthly = []
            # if expansion == 'tbc' or expansion == 'wotlk':
            #     completed_monthly = sel_all_completed_monthly_quests(expansion)

            # Fetch template quests
            # template_quests = sel_all_template_quests(expansion)

            # Organize all fetched data
            # all_data = {
            #     'accounts': format_accts_n_chars(accounts, characters),
            #     'completed_quests': format_completed_quests(
            #         completed_regular,
            #         completed_daily,
            #         completed_weekly,
            #         completed_monthly
            #     ),
            #     'template_quests': format_template_quests(template_quests)
            # }

            # # Send response with character and account data, filtered by faction
            # return Response(
            #     status=status.HTTP_200_OK,
            #     data=all_data
            # )
        # except OperationalError:
        #     return Response(
        #         status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        #         data={'message': 'Failed to retrieve data...'}
        #     )
        # except Exception as e:
        #     return Response(
        #         status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        #         data={'message': f'Server error: {e["message"]}'}
        #     )
        # except:
        #     return Response(
        #         status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        #         data={'message': 'Something weird happened!'}
        #     )

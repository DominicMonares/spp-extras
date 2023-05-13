from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
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

class QuestTrackerViewSet(viewsets.ViewSet):
    @action(methods=['GET'], detail=False)
    def all(self, request):
        expansion = request.GET.get('expansion')

        def send_success(data):
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

        # ----------------------------------------------------------------
        # Return final response
        # ----------------------------------------------------------------

        return send_success(all_data)

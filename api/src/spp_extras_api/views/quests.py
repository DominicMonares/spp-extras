from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from spp_extras_api.models.classiccharacters import\
    ClassicCharacterQueststatus,\
    ClassicCharacterQueststatusWeekly
from spp_extras_api.models.classicmangos import ClassicQuestTemplate
from spp_extras_api.models.tbccharacters import\
    TbcCharacterQueststatus,\
    TbcCharacterQueststatusDaily,\
    TbcCharacterQueststatusWeekly,\
    TbcCharacterQueststatusMonthly
from spp_extras_api.models.tbcmangos import TbcQuestTemplate
from spp_extras_api.models.wotlkcharacters import\
    WotlkCharacterQueststatus,\
    WotlkCharacterQueststatusDaily,\
    WotlkCharacterQueststatusWeekly,\
    WotlkCharacterQueststatusMonthly
from spp_extras_api.models.wotlkmangos import WotlkQuestTemplate
from spp_extras_api.utils.quests import all_completed_quests, all_quests


class QuestViewSet(viewsets.ViewSet):
    @action(methods=['GET'], detail=False)
    # Get completed quests from all characters
    def completed(self, request):
        expansion = request.GET.get('expansion')
        characters = request.GET.get('characters').split(',')
        regularQuestModel = {}
        dailyQuestModel = {}
        weeklyQuestModel = {}
        monthlyQuestModel = {}

        if expansion == 'classic':
            regularQuestModel = ClassicCharacterQueststatus
            weeklyQuestModel = ClassicCharacterQueststatusWeekly
        elif expansion == 'tbc':
            regularQuestModel = TbcCharacterQueststatus
            dailyQuestModel = TbcCharacterQueststatusDaily
            weeklyQuestModel = TbcCharacterQueststatusWeekly
            monthlyQuestModel = TbcCharacterQueststatusMonthly
        elif expansion == 'wotlk':
            regularQuestModel = WotlkCharacterQueststatus
            dailyQuestModel = WotlkCharacterQueststatusDaily
            weeklyQuestModel = WotlkCharacterQueststatusWeekly
            monthlyQuestModel = WotlkCharacterQueststatusMonthly

        chars = {}
        for i, c in enumerate(characters):
            if i % 2 == 1:
                continue
            chars[c] = characters[int(i) + 1]

        charIds = chars.keys()

        completedRegular = regularQuestModel.objects\
            .using(f'{expansion}characters')\
            .filter(guid__in=charIds, status=1)\
            .values()

        completedDaily = []
        if expansion == 'tbc' or expansion =='wotlk':
            completedDaily = dailyQuestModel.objects\
                .using(f'{expansion}characters')\
                .filter(guid__in=charIds)\
                .values()

        completedWeekly = weeklyQuestModel.objects\
            .using(f'{expansion}characters')\
            .filter(guid__in=charIds)\
            .values()

        completedMonthly = []
        if expansion == 'tbc' or expansion == 'wotlk':
            completedMonthly = monthlyQuestModel.objects\
                .using(f'{expansion}characters')\
                .filter(guid__in=charIds)\
                .values()

        all_completed = all_completed_quests(
            chars,
            completedRegular,
            completedDaily,
            completedWeekly,
            completedMonthly
        )

        return Response(
            status=status.HTTP_200_OK,
            data=all_completed
        )

    @action(methods=['GET'], detail=False)
    # Get all quests from world database
    def all(self, request):
        expansion = request.GET.get('expansion')
        questTemplateModel = {}

        if expansion == 'classic':
            questTemplateModel = ClassicQuestTemplate
        elif expansion == 'tbc':
            questTemplateModel = TbcQuestTemplate
        elif expansion == 'wotlk':
            questTemplateModel = WotlkQuestTemplate

        quests = questTemplateModel.objects\
            .using(f'{expansion}mangos')\
            .all()\
            .values(
                'entry',
                'zoneorsort',
                'type',
                'requiredclasses',
                'requiredraces',
                'title',
                'questflags'
            )

        return Response(
            status=status.HTTP_200_OK,
            data=all_quests(quests)
        )

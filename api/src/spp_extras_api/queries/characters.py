from django.db import connections
from spp_extras_api.models.classiccharacters import\
    ClassicCharacterQueststatus,\
    ClassicCharacterQueststatusWeekly,\
    ClassicCharacterReputation,\
    ClassicCharacters
from spp_extras_api.models.tbccharacters import\
    TbcCharacterQueststatus,\
    TbcCharacterQueststatusDaily,\
    TbcCharacterQueststatusMonthly,\
    TbcCharacterQueststatusWeekly,\
    TbcCharacterReputation,\
    TbcCharacters
from spp_extras_api.models.wotlkcharacters import\
    WotlkCharacterAchievement,\
    WotlkCharacterAchievementProgress,\
    WotlkCharacterAchievementSharedProgress,\
    WotlkCharacterQueststatus,\
    WotlkCharacterQueststatusDaily,\
    WotlkCharacterQueststatusMonthly,\
    WotlkCharacterQueststatusWeekly,\
    WotlkCharacterReputation,\
    WotlkCharacters,\
    WotlkCharacterSkills,\
    WotlkCharacterSpell,\
    WotlkItemInstance,\
    WotlkMail,\
    WotlkMailItems


# Change models depending on expansion

def characters_model(expansion):
    if expansion == 'classic':
        return ClassicCharacters
    elif expansion == 'tbc':
        return TbcCharacters
    else:
        return WotlkCharacters
    

def character_rep_model(expansion):
    if expansion == 'classic':
        return ClassicCharacterReputation
    elif expansion == 'tbc':
        return TbcCharacterReputation
    else:
        return WotlkCharacterReputation


def regular_quest_model(expansion):
    if expansion == 'classic':
        return ClassicCharacterQueststatus
    elif expansion == 'tbc':
        return TbcCharacterQueststatus
    else:
        return WotlkCharacterQueststatus


def daily_quest_model(expansion):
    if expansion == 'tbc':
        return TbcCharacterQueststatusDaily
    else:
        return WotlkCharacterQueststatusDaily


def weekly_quest_model(expansion):
    if expansion == 'classic':
        return ClassicCharacterQueststatusWeekly
    elif expansion == 'tbc':
        return TbcCharacterQueststatusWeekly
    else:
        return WotlkCharacterQueststatusWeekly


def monthly_quest_model(expansion):
    if expansion == 'tbc':
        return TbcCharacterQueststatusMonthly
    else:
        return WotlkCharacterQueststatusMonthly


########## Character Queries ##########

def sel_all_chars(expansion):
    return characters_model(expansion).objects\
        .using(f'{expansion}characters')\
        .all()\
        .values(
            'guid', 
            'account', 
            'name', 
            'race', 
            'gender', 
            'class_field', 
            'totalkills', 
            'knowntitles'
        )


########## Achievement Queries ##########

# Achievement Credit Queries

def sel_all_char_achievements():
    return WotlkCharacterAchievement.objects\
        .using('wotlkcharacters')\
        .all()\
        .values()


def ins_char_achievements(achievements):
    WotlkCharacterAchievement.objects\
        .using('wotlkcharacters')\
        .bulk_create(achievements, ignore_conflicts=True)
    

def ins_char_honor_kills(chars): # NEEDS REFACTORING
    WotlkCharacters.objects\
        .using('wotlkcharacters')\
        .bulk_update(chars, [])


# Achievement Progress Queries

def sel_all_achievement_prog():
    return WotlkCharacterAchievementProgress.objects\
        .using('wotlkcharacters')\
        .all()\
        .values()

def ins_achievement_prog(achievements):
    for ach in achievements:
        guid = ach['guid']
        criteria = ach['criteria']
        counter = ach['counter']
        date = ach['date']

        try:
            item = WotlkCharacterAchievementProgress.objects\
                .using('wotlkcharacters')\
                .get(
                    guid=guid, 
                    criteria=criteria
                )
        except WotlkCharacterAchievementProgress.DoesNotExist:
            WotlkCharacterAchievementProgress.objects\
                .using('wotlkcharacters')\
                .create(
                    guid=guid, 
                    criteria=criteria, 
                    counter=counter, 
                    date=date
                )
        else:
            item = WotlkCharacterAchievementProgress.objects\
                .using('wotlkcharacters')\
                .filter(
                    guid=guid,
                    criteria=criteria,
                )\
                .update(
                    counter=counter,
                    date=date
                )


        # WotlkCharacterAchievementProgress.objects\
        #     .using('wotlkcharacters')\
        #     .update_or_create(
        #         guid=guid,
        #         criteria=criteria,
        #         defaults={
        #             # 'guid': ach['guid']
        #             # 'criteria': ach['criteria'],
        #             'counter': counter,
        #             'date': date
        #         }
        #     )


# Achievement Shared Progress Queries

def char_achievement_shared_prog_exists():
    wotlk_char_connection = connections['wotlkcharacters']
    cursor = wotlk_char_connection.cursor()
    tables = wotlk_char_connection.introspection.table_names(cursor)
    if 'character_achievement_shared_progress' in tables: return True


def create_char_achievement_shared_prog():
    with connections['wotlkcharacters'].schema_editor() as schema_editor:
        schema_editor.create_model(WotlkCharacterAchievementSharedProgress)


def sel_all_char_achievement_shared_prog():
    return WotlkCharacterAchievementSharedProgress.objects\
        .using('wotlkcharacters')\
        .all()\
        .values()


def ins_char_achievement_shared_prog(achievements):
    for ach in achievements:
        WotlkCharacterAchievementSharedProgress.objects\
            .using('wotlkcharacters')\
            .update_or_create(
                account=ach['account'],
                criteria=int(ach['criteria']),
                defaults={
                    # 'account': ach['account'],
                    # 'criteria': ach['criteria'],
                    'counter': ach['counter'],
                    'date': ach['date']
                }
            )


# Achievement Reward Title Queries

def upd_reward_titles(titles):
    for t in titles:
        record = WotlkCharacters.objects\
            .using('wotlkcharacters')\
            .get(guid=t)

        record.knowntitles = titles[t]
        record.save()


# Achievement Reward Item Queries

def sel_last_item_inst_id():
    return WotlkItemInstance.objects\
        .using('wotlkcharacters')\
        .all()\
        .values('guid')\
        .last()


def ins_reward_item_instances(instances):
    WotlkItemInstance.objects\
        .using('wotlkcharacters')\
        .bulk_create(instances)


def sel_last_mail_id():
    return WotlkMail.objects\
        .using('wotlkcharacters')\
        .all()\
        .values('id')\
        .last()


def ins_reward_mail(mail):
    WotlkMail.objects\
        .using('wotlkcharacters')\
        .bulk_create(mail)


def ins_reward_mail_items(items):
    WotlkMailItems.objects\
        .using('wotlkcharacters')\
        .bulk_create(items)


# Achievement Reward Spell Queries

def sel_all_char_spells():
    return WotlkCharacterSpell.objects\
        .using('wotlkcharacters')\
        .all()\
        .values('guid', 'spell')


def ins_char_spells(spells): # NEEDS REFACTORING
    WotlkCharacterSpell.objects\
        .using('wotlkcharacters')\
        .bulk_create(spells, ignore_conflicts=True)


def sel_all_char_skills():
    return WotlkCharacterSkills.objects\
        .using('wotlkcharacters')\
        .all()\
        .values('guid', 'skill', 'values')


########## Quest Queries ##########

def sel_all_completed_reg_quests(expansion):
    return regular_quest_model(expansion).objects\
        .using(f'{expansion}characters')\
        .all()\
        .filter(status__exact=1)\
        .values()


def sel_all_completed_daily_quests(expansion):
    return daily_quest_model(expansion).objects\
        .using(f'{expansion}characters')\
        .all()\
        .values()


def sel_all_completed_weekly_quests(expansion):
    return weekly_quest_model(expansion).objects\
        .using(f'{expansion}characters')\
        .all()\
        .values()


def sel_all_completed_monthly_quests(expansion):
    return monthly_quest_model(expansion).objects\
        .using(f'{expansion}characters')\
        .all()\
        .values()


########## Reputation Queries ##########

def sel_all_char_rep(expansion):
    return character_rep_model(expansion).objects\
        .using(f'{expansion}characters')\
        .all()\
        .values('guid', 'faction', 'standing')

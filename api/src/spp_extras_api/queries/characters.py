def sel_all_char_data(expansion, model):
    return model.objects\
        .using(f'{expansion}characters')\
        .all()\
        .values('guid', 'account', 'name', 'race', 'class_field')


def sel_all_completed_reg_quests(expansion, model):
    return model.objects\
        .using(f'{expansion}characters')\
        .all()\
        .filter(status__exact=1)\
        .values()


def sel_all_completed_daily_quests(expansion, model):
    return model.objects\
        .using(f'{expansion}characters')\
        .all()\
        .values()


def sel_all_completed_weekly_quests(expansion, model):
    return model.objects\
        .using(f'{expansion}characters')\
        .all()\
        .values()


def sel_all_completed_monthly_quests(expansion, model):
    return model.objects\
        .using(f'{expansion}characters')\
        .all()\
        .values()

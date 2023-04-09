def sel_all_template_quests(expansion, model):
    return model.objects\
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

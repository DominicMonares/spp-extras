def get_all_character_data(expansion, model):
    return model.objects\
        .using(f'{expansion}characters')\
        .all()\
        .values('guid', 'account', 'name', 'race', 'class_field')

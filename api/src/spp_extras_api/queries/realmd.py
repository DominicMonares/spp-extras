def sel_all_account_data(expansion, model):
    return model.objects\
        .using(f'{expansion}realmd')\
        .all()\
        .values('id', 'username')

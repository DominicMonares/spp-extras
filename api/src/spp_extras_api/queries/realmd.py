from spp_extras_api.models.classicrealmd import ClassicAccount
from spp_extras_api.models.tbcrealmd import TbcAccount
from spp_extras_api.models.wotlkrealmd import WotlkAccount


account_model = WotlkAccount


# Change model depending on expansion
def set_model(expansion):
    if expansion == 'classic':
        account_model = ClassicAccount
    elif expansion == 'tbc':
        account_model = TbcAccount
    else:
        account_model = WotlkAccount


def sel_all_account_data(expansion):
    set_model(expansion)
    return account_model.objects\
        .using(f'{expansion}realmd')\
        .all()\
        .values('id', 'username')

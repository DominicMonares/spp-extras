from spp_extras_api.models.classicrealmd import ClassicAccount
from spp_extras_api.models.tbcrealmd import TbcAccount
from spp_extras_api.models.wotlkrealmd import WotlkAccount


# Change models depending on expansion

def account_model(expansion):
    if expansion == 'classic':
        return ClassicAccount
    elif expansion == 'tbc':
        return TbcAccount
    else:
        return WotlkAccount


# ----------------------------------------------------------------
# Accounts
# ----------------------------------------------------------------

def sel_all_account_data(expansion):
    return account_model(expansion).objects\
        .using(f'{expansion}realmd')\
        .all()\
        .values('id', 'username')

import django
from django.db import connection
from django.db.utils import OperationalError


def db_connected(expansion):
    # connection
    # if (expansion == 'classic'):
    #     connection = connections['classicmangos']
    # elif (expansion == 'tbc'):
    #     connection = connections['tbcmangos']
    # else:
    #     connection = connections['wotlkmangos']
      
      
    try: 
        print(connection.ensure_connection())
    except OperationalError:
        return False
    else:
        return True

from django.urls import re_path
from .consumers.achievements import AccountWideAchievementsConsumer
from .consumers.pets_mounts import AccountWidePetsMountsConsumer
from .consumers.reputations import AccountWideReputationsConsumer

websocket_urlpatterns = [
    re_path(r'ws/account_wide/achievements/$', AccountWideAchievementsConsumer.as_asgi()),
    re_path(r'ws/account_wide/pets_mounts/$', AccountWidePetsMountsConsumer.as_asgi()),
    re_path(r'ws/account_wide/reputations/$', AccountWideReputationsConsumer.as_asgi())
]


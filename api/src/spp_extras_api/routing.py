from django.urls import re_path
from .consumers.achievements import AccountWideAchievementsConsumer
from .consumers.mountsAndPets import AccountWideMountsPetsConsumer
from .consumers.reputations import AccountWideReputationsConsumer

websocket_urlpatterns = [
    re_path(r'ws/account_wide/achievements/$', AccountWideAchievementsConsumer.as_asgi()),
    re_path(r'ws/account_wide/mounts_pets/$', AccountWideMountsPetsConsumer.as_asgi()),
    re_path(r'ws/account_wide/reputations/$', AccountWideReputationsConsumer.as_asgi())
]


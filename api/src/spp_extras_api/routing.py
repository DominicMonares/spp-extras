from django.urls import re_path
from .consumers.achievements import AccountWideAchievementsConsumer

websocket_urlpatterns = [
    re_path(r'ws/achievements/account_wide/$', AccountWideAchievementsConsumer.as_asgi()),
]

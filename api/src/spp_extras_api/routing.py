from django.urls import re_path
from .consumers.achievements import AccountWideAchievementsConsumer

websocket_urlpatterns = [
    re_path(r'ws/account_wide/achievements/$', AccountWideAchievementsConsumer.as_asgi()),
]

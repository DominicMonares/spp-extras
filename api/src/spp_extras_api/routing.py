from django.urls import path
from .consumers.achievements import AccountWideAchievements


websocket_urlpatterns = [
    path('', AccountWideAchievements.as_asgi()),
]

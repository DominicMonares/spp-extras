from django.urls import re_path
from .consumers.account_wide import AccountWideConsumer

websocket_urlpatterns = [
    re_path(r'ws/account_wide/transfer/$', AccountWideConsumer.as_asgi()),
]


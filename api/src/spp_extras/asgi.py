"""
ASGI config for spp_extras project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os
import django
from channels.http import AsgiHandler
from channels.routing import ProtocolTypeRouter
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import spp_extras_api.routing


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'spp_extras.settings')
django.setup()

application = ProtocolTypeRouter({
    'http': AsgiHandler(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            spp_extras_api.routing.websocket_urlpatterns
        )
    ),
})

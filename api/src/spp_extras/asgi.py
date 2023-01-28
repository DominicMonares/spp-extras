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
# from django.core.asgi import get_asgi_application


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'spp_extras.settings')
django.setup()

# application = get_asgi_application()
application = ProtocolTypeRouter({
  'http': AsgiHandler(),
})


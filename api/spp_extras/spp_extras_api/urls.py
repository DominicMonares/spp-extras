from django.urls import include, path
from rest_framework import routers

from .views.characters import CharactersViewSet
from .views.quests import QuestViewSet

router = routers.DefaultRouter()
router.register( 'characters', CharactersViewSet, basename='/characters' )
router.register( 'quests', QuestViewSet, basename='/quests' )

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
]

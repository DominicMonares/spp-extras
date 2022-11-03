from django.urls import include, path
from rest_framework import routers

from .views.characters import CharactersViewSet
from .views.quest_tracker import QuestTrackerViewSet

router = routers.DefaultRouter()
router.register( 'characters', CharactersViewSet, basename='/characters' )
router.register( 'quest_tracker', QuestTrackerViewSet, basename='/quest_tracker' )

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
]

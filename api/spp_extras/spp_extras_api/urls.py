from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register( 'quest_tracker', views.QuestTrackerViewSet, basename='/quest_tracker' )
router.register( 'test', views.TestViewSet, basename='/test' )

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
]

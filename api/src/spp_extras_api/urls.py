from django.urls import include, path
from rest_framework import routers
from .views.all_data import DataViewSet


router = routers.DefaultRouter()
router.register( 'data', DataViewSet, basename='/data' )

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
]

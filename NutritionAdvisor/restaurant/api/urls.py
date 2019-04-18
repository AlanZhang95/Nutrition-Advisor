from restaurant.api.views import RRViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'restaurant', RRViewSet, basename='restaurant')
urlpatterns = router.urls
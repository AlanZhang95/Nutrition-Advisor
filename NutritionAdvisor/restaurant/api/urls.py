from restaurant.api.views import RRViewSet, LoseViewSet, GainViewSet, TransViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'restaurant', RRViewSet, basename='restaurant')
router.register(r'lose', LoseViewSet, basename='restaurant')
router.register(r'transform', TransViewSet, basename='restaurant')
router.register(r'gain', GainViewSet, basename='restaurant')
urlpatterns = router.urls
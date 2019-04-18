from weighttracker.api.views import WeightTrackerViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'tracker', WeightTrackerViewSet, basename='tracker')
urlpatterns = router.urls

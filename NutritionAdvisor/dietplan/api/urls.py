from dietplan.api.views import DietPlanViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'plans', DietPlanViewSet, basename='plans')
urlpatterns = router.urls
from dietplan.api.views import DietPlanViewSet, GeneratedByViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'plans', DietPlanViewSet, basename='plans')
router.register(r'generatedby', GeneratedByViewSet, basename='generatedby')
urlpatterns = router.urls
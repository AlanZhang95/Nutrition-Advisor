from foodtable.api.views import FoodViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'foods', FoodViewSet, basename='foods')
urlpatterns = router.urls
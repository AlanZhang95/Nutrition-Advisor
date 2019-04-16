from users.api.views import UserProfileViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserProfileViewSet, basename = 'userss')
urlpatterns = router.urls
from users.models import UserProfile
from .serializers import UserProfileSerializer
from rest_framework import viewsets
from rest_framework.response import Response

class UserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()


from restaurant.models import Recommendation
from .serializers import RRSerializer
from rest_framework import viewsets
from rest_framework.response import Response

class RRViewSet(viewsets.ModelViewSet):
    serializer_class = RRSerializer
    queryset = Recommendation.objects.all()
from dietplan.models import Plan
from .serializers import WeightTrackerSerializer
from rest_framework import viewsets
from rest_framework.response import Response

class WeightTrackerViewSet(viewsets.ModelViewSet):
    serializer_class = WeightTrackerSerializer
    queryset = Plan.objects.all()

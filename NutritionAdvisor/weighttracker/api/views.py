from .serializers import WeightTrackerSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from weighttracker.models import Tracker

class WeightTrackerViewSet(viewsets.ModelViewSet):
    serializer_class = WeightTrackerSerializer
    queryset = Tracker.objects.all()

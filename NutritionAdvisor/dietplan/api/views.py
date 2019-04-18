from dietplan.models import Plan, GeneratedBy
from .serializers import DietPlanSerializer, GeneratedBySerializer
from rest_framework import viewsets
from rest_framework.response import Response

class DietPlanViewSet(viewsets.ModelViewSet):
    serializer_class = DietPlanSerializer
    queryset = Plan.objects.all()

class GeneratedByViewSet(viewsets.ModelViewSet):
    serializer_class = GeneratedBySerializer
    queryset = GeneratedBy.objects.all()


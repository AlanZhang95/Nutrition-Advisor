from dietplan.models import Plan
from .serializers import DietPlanSerializer
from rest_framework import viewsets
from rest_framework.response import Response

class DietPlanViewSet(viewsets.ModelViewSet):
    serializer_class = DietPlanSerializer
    queryset = Plan.objects.all()


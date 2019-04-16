from foodtable.models import Food
from .serializers import FoodSerializer
from rest_framework import viewsets
from rest_framework.response import Response

class FoodViewSet(viewsets.ModelViewSet):
    serializer_class = FoodSerializer
    queryset = Food.objects.all()
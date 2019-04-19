from restaurant.models import Recommendation
from .serializers import RRSerializer
from rest_framework import viewsets
from rest_framework.response import Response

class RRViewSet(viewsets.ModelViewSet):
    serializer_class = RRSerializer
    queryset = Recommendation.objects.all()


class LoseViewSet(viewsets.ModelViewSet):
    serializer_class = RRSerializer
    queryset = Recommendation.objects.values('name', 'goal', 'choices', 'aggregate',).filter(goal="Lose Fat")

class TransViewSet(viewsets.ModelViewSet):
    serializer_class = RRSerializer
    queryset = Recommendation.objects.values('name', 'goal', 'choices', 'aggregate',).filter(goal="Transform")

class GainViewSet(viewsets.ModelViewSet):
    serializer_class = RRSerializer
    queryset = Recommendation.objects.values('name', 'goal', 'choices', 'aggregate',).filter(goal="Gain Muscle")

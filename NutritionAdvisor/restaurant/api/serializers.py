from rest_framework import serializers
from restaurant.models import Recommendation
from rest_framework import serializers

class RRSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Recommendation
        fields = (
            'id', 'name', 'choices', 'aggregate', 'goal'
        )
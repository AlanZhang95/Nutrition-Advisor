from rest_framework import serializers
from dietplan.models import Plan, GeneratedBy
from users.models import UserProfile
from weighttracker.models import Tracker
from django.contrib.auth.models import User
from django.db.models import Count
from rest_framework import serializers
from rest_auth.models import TokenModel
from drf_writable_nested import WritableNestedModelSerializer

class WeightTrackerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tracker
        fields = (
            'weight', 'calories_consumed'
        )

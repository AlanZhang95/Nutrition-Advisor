from rest_framework import serializers
from users.models import UserProfile
from weighttracker.models import Tracker
from django.contrib.auth.models import User
from django.db.models import Count
from rest_framework import serializers
from rest_auth.models import TokenModel
from drf_writable_nested import WritableNestedModelSerializer

class WeightTrackerSerializer(serializers.ModelSerializer):
    #weight_log = serializers.SerializerMethodField()
    #cal_log = serializers.SerializerMethodField()
    
    class Meta:
        model = Tracker
        fields = (
            'weight', 'calories_consumed', 'user',
        )
        #'weight_log', 'cal_log',
"""
    def get_weight_log(self, obj):
        weight_query = Tracker.objects.values('id', 'weight','user_id').filter(user_id=obj.user.id)
        weight_v = {}
        for pair in weight_query:
            weight_v['id'] = pair['weight']
        return weight_v

    def get_cal_log(self, obj):
        cal_query = Tracker.objects.values('id', 'calories_consumed','user_id').filter(user_id=obj.user.id)
        cal = {}
        for pair in cal_query:
            cal['id'] = pair['calories_consumed']
        return cal
"""

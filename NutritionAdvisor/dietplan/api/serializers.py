from rest_framework import serializers
from dietplan.models import Plan, GeneratedBy
from users.models import UserProfile
from foodtable.models import Food
from django.contrib.auth.models import User
from django.db.models import Count
from rest_framework import serializers
from rest_auth.models import TokenModel
from drf_writable_nested import WritableNestedModelSerializer

class DietPlanSerializer(serializers.ModelSerializer):
    foods_list = serializers.SerializerMethodField()
    fat_calories = serializers.SerializerMethodField()
    #protein_calories = serializers.SerializerMethodField()
    #carbs_calories = serializers.SerializerMethodField()
    #total_calories = serializers.SerializerMethodField()
    def get_foods_list(self, obj):
        queryset = Food.objects.values('name').filter(id__in=GeneratedBy.objects.values('food_id').filter(plan_id=obj.id))
        food_list = []
        for item in queryset:
            food_list.append(item['name'])
        return food_list

    def get_fat_calories(self, obj):
       # sql = """
      #      select amount from dietplan_GeneratedBy as gb
      #      where gb.plan_id = obj.id and 

      #  """
        food_query = Food.objects.values('fat').filter(id__in=GeneratedBy.objects.values('food_id').filter(plan_id=obj.id))
        fat_cal = 0
        for food in food_query:
    #        amount = GeneratedBy.objects.values('amount').
            fat_cal += food['fat'] * 8# * amount
        return fat_cal

    class Meta:
        model = Plan
        fields = ('id', 'name', 'date', 
            'user', 'status', 
            'foods_list', 'foods', 'fat_calories')
            #'carbs_cal','fat_cal', , 'total_cal''protein_cal', 
    
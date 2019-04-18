from rest_framework import serializers
from dietplan.models import Plan, GeneratedBy
from users.models import UserProfile
from foodtable.models import Food
from django.contrib.auth.models import User
from django.db.models import Count
from rest_framework import serializers
from rest_auth.models import TokenModel
from drf_writable_nested import WritableNestedModelSerializer

class GeneratedBySerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneratedBy
        fields = (
            'plan', 'food', 'amount'
        )

class DietPlanSerializer(serializers.ModelSerializer):
    foods_list = serializers.SerializerMethodField()
    fat_calories = serializers.SerializerMethodField()
    protein_calories = serializers.SerializerMethodField()
    carbs_calories = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    amounts = serializers.SerializerMethodField()
    def get_foods_list(self, obj):
        queryset = Food.objects.values('name').filter(id__in=GeneratedBy.objects.values('food_id').filter(plan_id=obj.id))
        food_list = []
        for item in queryset:
            food_list.append(item['name'])
        return food_list

    def get_fat_calories(self, obj):
        food_query = Food.objects.values('fat', 'id').filter(id__in=GeneratedBy.objects.values('food_id').filter(plan_id=obj.id))
        fat_cal = 0
        for food in food_query:
            amount = GeneratedBy.objects.values('amount','food_id','plan_id').filter(food_id=food['id'],plan_id=obj.id)
            for num in amount:
                fat_cal += food['fat'] * 8 * num['amount'] / 100
        return fat_cal

    def get_protein_calories(self, obj):
        food_query = Food.objects.values('protein', 'id').filter(id__in=GeneratedBy.objects.values('food_id').filter(plan_id=obj.id))
        protein_cal = 0
        for food in food_query:
            amount = GeneratedBy.objects.values('amount','food_id','plan_id').filter(food_id=food['id'],plan_id=obj.id)
            for num in amount:
                protein_cal += food['protein'] * 4 * num['amount'] / 100
        return protein_cal

    def get_carbs_calories(self, obj):
        food_query = Food.objects.values('carbs', 'id').filter(id__in=GeneratedBy.objects.values('food_id').filter(plan_id=obj.id))
        carbs_cal = 0
        for food in food_query:
            amount = GeneratedBy.objects.values('amount','food_id','plan_id').filter(food_id=food['id'],plan_id=obj.id)
            for num in amount:
                carbs_cal += food['carbs'] * 4 * num['amount'] / 100
        return carbs_cal

    def get_username(self, obj):
        queryset = User.objects.values('id', 'username').filter(id=obj.user.id)
        for user in queryset:
            author = user['username']
        return author

    def get_amounts(self, obj):
        food_query = Food.objects.values('name', 'id').filter(id__in=GeneratedBy.objects.values('food_id').filter(plan_id=obj.id))
        amounts = {}
        for food in food_query:
            amount_query = GeneratedBy.objects.values('amount','food_id','plan_id').filter(food_id=food['id'],plan_id=obj.id)
            for amount in amount_query:
                amounts[food['name']] = amount['amount'] 
        return amounts

    class Meta:
        model = Plan
        fields = ('id', 'name', 'date', 
            'user', 'status', 
            'foods_list', 'foods', 'fat_calories', 'protein_calories', 'carbs_calories', 'username', 'amounts', )
            #'carbs_cal','fat_cal', , 'total_cal''protein_cal', 
    
from rest_framework import serializers
from foodtable.models import Food
from django.contrib.auth.models import User
from django.db.models import Count
from rest_framework import serializers
from rest_auth.models import TokenModel
from drf_writable_nested import WritableNestedModelSerializer

class FoodSerializer(serializers.ModelSerializer):
    foods_summary = serializers.SerializerMethodField()

    def get_foods_summary(self, obj):
        count_set = Food.objects.all().values('source_type').annotate(cnt=Count('source_type')).order_by('cnt')
        count_dict = {}
        for item in count_set:
            count_dict[item['source_type']] = item['cnt']
        return count_dict

    class Meta:
        model = Food
        fields = ('id', 'name', 'carbs','fiber','protein','fat','source_type', 'foods_summary')

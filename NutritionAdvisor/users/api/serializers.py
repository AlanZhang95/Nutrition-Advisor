from rest_framework import serializers
from users.models import UserProfile
from dietplan.models import Plan
from django.contrib.auth.models import User
from django.db.models import Count
from rest_framework import serializers
from rest_auth.models import TokenModel
from drf_writable_nested import WritableNestedModelSerializer
from django.db.models.signals import post_save
from django.dispatch import receiver
from weighttracker.models import Tracker


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance, height=0, age=0, weight=0)


def cal_bmr(gender, age, weight, height):  #reference: http://www.jurnal.unsyiah.ac.id/AIJST/article/view/5196/pdf(Hlbert and Elesa, 2004)
    male_bmr = 66 + 13.7 * weight + 5 * height - 6.8 * age
    female_bmr = 655 + 9.6 * weight + 1.8 * height - 4.7 * age
    if gender == "Male" :
        return male_bmr
    elif gender == "Female" :
        return female_bmr
    else:
        return (female_bmr + male_bmr) / 2
         
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'email')

class UserProfileSerializer(WritableNestedModelSerializer):
    #user = UserSerializer()
    bmr = serializers.SerializerMethodField()
    advised_calories = serializers.SerializerMethodField()
    #bmr: basal metabolic rate
    user_plans = serializers.SerializerMethodField()
    
    def get_bmr(self, obj):
        gender_q = UserProfile.objects.values('gender').filter(id__in=UserProfile.objects.values('id').filter(id=obj.id))
        age_q = UserProfile.objects.values('age').filter(id__in=UserProfile.objects.values('id').filter(id=obj.id))
        weight_q = UserProfile.objects.values('weight').filter(id__in=UserProfile.objects.values('id').filter(id=obj.id))
        height_q = UserProfile.objects.values('height').filter(id__in=UserProfile.objects.values('id').filter(id=obj.id))
        gender = ""
        age = 0
        weight = 0
        height = 0
        for str1 in gender_q:
            gender = str1['gender']
        for int2 in age_q:
            age = int2['age']
        for int3 in weight_q:
            weight = int3['weight']
        for int4 in height_q:
            height = int4['height']
        bmr = cal_bmr(gender, age, weight, height)
        return bmr
    def get_advised_calories(self, obj):
        gender_q = UserProfile.objects.values('gender').filter(id__in=UserProfile.objects.values('id').filter(id=obj.id))
        age_q = UserProfile.objects.values('age').filter(id__in=UserProfile.objects.values('id').filter(id=obj.id))
        weight_q = UserProfile.objects.values('weight').filter(id__in=UserProfile.objects.values('id').filter(id=obj.id))
        height_q = UserProfile.objects.values('height').filter(id__in=UserProfile.objects.values('id').filter(id=obj.id))
        gender = ""
        age = 0
        weight = 0
        height = 0
        for str1 in gender_q:
            gender = str1['gender']
        for int2 in age_q:
            age = int2['age']
        for int3 in weight_q:
            weight = int3['weight']
        for int4 in height_q:
            height = int4['height']
        bmr = cal_bmr(gender, age, weight, height)
        active_level_q = UserProfile.objects.values('activity').filter(id__in=UserProfile.objects.values('id').filter(id=obj.id))
        active_level = ""
        for str1 in active_level_q:
            active_level = str1['activity']
        if active_level == 'NA':
            bmr = bmr * 1.01 + 20
        elif active_level == 'AC':
            bmr = bmr * 1.03 + 50
        else:
            bmr = bmr * 1.08 + 100
        my_goal_q = UserProfile.objects.values('my_goal').filter(id__in=UserProfile.objects.values('id').filter(id=obj.id))
        my_goal = ''
        for str2 in my_goal_q:
            my_goal = str2['my_goal']
        if my_goal == 'LF':
            return bmr * 0.975 - 20
        elif my_goal == 'GM':
            return bmr * 1.015 + 50
        else:
            return bmr

    def get_user_plans(self, obj):
        queryset = Plan.objects.values('id','name','date','status','user').filter(user=obj.id)
        plans = []
        for plan in queryset:
            plans.append({
                "planID": plan['id'],
                "name": plan['name'],
                "date": plan['date'],
                "status": plan['status'],
            })
        return plans
    
    weight_cal = serializers.SerializerMethodField()

    def get_weight_cal(self, obj):
        queryset = Tracker.objects.values('weight','calories_consumed','user').filter(user=obj.id)
        weight = []
        cal = []
        for pair in queryset:
            weight.append({
                "y": pair['weight'],
            })
            cal.append({
                "y": pair['calories_consumed'],
            }) 

        tracks = {
            "weight": weight,
            "cal": cal, 
        }
        return tracks


    class Meta:
        model = UserProfile
        fields = ('id', 'gender', 'my_goal', 'height', 'weight', 'activity', 'age', 'bmr', 'advised_calories', 'user_plans', 'weight_cal')

class TokenSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = TokenModel
        fields = ('key', 'user')




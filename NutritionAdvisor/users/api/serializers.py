from rest_framework import serializers
from users.models import UserProfile
from django.contrib.auth.models import User
from django.db.models import Count
from rest_framework import serializers
from rest_auth.models import TokenModel
from drf_writable_nested import WritableNestedModelSerializer
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance, height=0, age=0, weight=0)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'email')

class UserProfileSerializer(WritableNestedModelSerializer):
    user = UserSerializer()
    class Meta:
        model = UserProfile
        fields = ('id', 'user', 'gender', 'my_goal', 'height', 'weight', 'activity', 'age')

class TokenSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = TokenModel
        fields = ('key', 'user')


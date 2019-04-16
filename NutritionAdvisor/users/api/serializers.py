from rest_framework import serializers
from users.models import UserProfile
from django.contrib.auth.models import User
from django.db.models import Count
from rest_framework import serializers
from rest_auth.models import TokenModel
from drf_writable_nested import WritableNestedModelSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')

class UserProfileSerializer(WritableNestedModelSerializer):
    user = UserSerializer()
    class Meta:
        model = UserProfile
        fields = ('user', 'gender', 'my_goal', 'height', 'weight', 'activity', 'age')

class TokenSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = TokenModel
        fields = ('key', 'user')


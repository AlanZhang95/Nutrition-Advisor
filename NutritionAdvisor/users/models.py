from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now
# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    GENDER_CHOICES = ['Male', 'Female', 'Others']
    gender = models.CharField(
        max_length=10, 
        choices=[(i, i) for i in GENDER_CHOICES], 
        default='Others')
    LOSEFAT = 'LF'
    GAINMUSCLE= 'GM'
    TRANSFORM = 'TF'
    MY_GOAL_CHOICE = (
        (LOSEFAT, 'Lose Fat'),             #(actual value, human-readable name)
        (GAINMUSCLE, 'Gain Muscle'),
        (TRANSFORM, 'Transform'),
    )
    my_goal = models.CharField(
        max_length=2,
        choices=MY_GOAL_CHOICE,
        default=TRANSFORM,
    )
    VERYACTIVE = 'VA'
    ACTIVE = 'AC'
    NOTACTIVE = 'NA'
    ACTIVITY_CHOICE = (
        (VERYACTIVE, 'Very Active'),
        (ACTIVE, 'Active'),
        (NOTACTIVE, ' Not Active'),
    )
    activity = models.CharField(
        max_length=2,
        choices=ACTIVITY_CHOICE,
        default=ACTIVE,
    )
    height = models.IntegerField(blank=True)
    age = models.IntegerField(blank=True)
    weight = models.IntegerField(blank=True)
    ## is it a one-to-one relation???

    def __str__(self):
        return self.user.username
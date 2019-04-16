from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import User
# Create your models here.

class tracker(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
        )
    date = now
    weight = models.IntegerField()
    calories_consumed = models.IntegerField(
        blank=True
    )



from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import User
# Create your models here.

class Tracker(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
        )
    date = now
    weight = models.DecimalField(
        max_digits=5,
        decimal_places=2
    )
    calories_consumed = models.IntegerField(
        blank=True
    )

from django.db import models
from django.contrib.auth.models import User
from foodtable.models import Food
from django.utils.timezone import now


class Plan(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
        )
    name = models.CharField(max_length=20) # diet plan name 
    date = models.DateTimeField(default=now, blank=True)
    status = models.BooleanField(default=False)
    foods = models.ManyToManyField(
        Food, 
        through='GeneratedBy', 
        through_fields=('plan', 'food')
    )
    fat_calories = 0
    protein_calories = 0
    carbs_calories = 0
"""
    @property
    def fat_cal(self):
        for food in foods:
            fat_calories += food.fat * 8
        return fat_calories

    @property
    def protein_cal(self):
        for food in foods:
            protein_calories += food.protein * 4
        return protein_calories

    @property
    def carbs_cal(self):
        for food in foods:
            carbs_calories += food.carbs * 4
        return carbs_calories

    @property
    def total_cal(self):
        return fat_calories + carbs_calories + protein_calories

    def __str__(self):
        return self.name
"""
        

class GeneratedBy(models.Model):
    plan = models.ForeignKey(
        Plan, 
        on_delete=models.CASCADE)
    food = models.ForeignKey(
        Food, 
        on_delete=models.CASCADE)
    amount = models.IntegerField()

from django.db import models

# Create your models here.
class Recommendation(models.Model):
    name = models.CharField(max_length=50, unique=True)
    choices = models.IntegerField()
    aggregate = models.IntegerField()
    goal = models.CharField(max_length=20)

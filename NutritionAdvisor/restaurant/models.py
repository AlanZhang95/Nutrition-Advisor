from django.db import models

# Create your models here.
class recommendation(models.Model):
    name = models.CharField(unique=True)
    choices = models.IntegerField()
    aggregate = models.IntegerField()
    goal = models.CHarField()
    
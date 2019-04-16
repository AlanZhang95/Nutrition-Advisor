from django.db import models
from django.utils.timezone import now
# Create your models here.
class Food(models.Model):
    #see 3h at video to be dimanic
    name = models.CharField(max_length=11, unique=True)
    carbs = models.IntegerField()
    fiber = models.IntegerField()
    protein = models.IntegerField()
    fat = models.IntegerField()
    PROTEINTYPE = 'pt'
    FATTYPE = 'ft'
    CARBSTYPE = 'ct'
    SOURCE_TYPE_CHOICE = (
        (PROTEINTYPE, 'Main Protein Source'),
        (FATTYPE, 'Main Fat Source'),
        (CARBSTYPE, 'Main Carbonhydrate Source'),
    )
    source_type = models.CharField(
        max_length=2,
        choices=SOURCE_TYPE_CHOICE,
        default=CARBSTYPE,
        )

    def __str__(self):
        return self.name
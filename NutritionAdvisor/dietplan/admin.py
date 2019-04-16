from django.contrib import admin

# Register your models here.

from dietplan.models import Plan, GeneratedBy
admin.site.register(Plan)
admin.site.register(GeneratedBy)
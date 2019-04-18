# Generated by Django 2.0.7 on 2019-04-18 18:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Recommendation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('choices', models.IntegerField()),
                ('aggregate', models.IntegerField()),
                ('goal', models.CharField(max_length=20)),
            ],
        ),
    ]

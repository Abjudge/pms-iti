# Generated by Django 4.2.2 on 2023-07-01 14:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='actual_end_date',
            field=models.DateTimeField(blank=True),
        ),
    ]
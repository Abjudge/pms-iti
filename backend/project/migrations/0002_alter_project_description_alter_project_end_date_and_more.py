# Generated by Django 4.2.2 on 2023-07-01 14:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='description',
            field=models.CharField(blank=True, max_length=250),
        ),
        migrations.AlterField(
            model_name='project',
            name='end_date',
            field=models.DateTimeField(blank=True),
        ),
        migrations.AlterField(
            model_name='project',
            name='start_date',
            field=models.DateTimeField(blank=True),
        ),
    ]

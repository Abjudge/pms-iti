# Generated by Django 4.2.2 on 2023-06-21 16:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0003_alter_project_clone_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='repe_name',
            field=models.CharField(blank=True, max_length=250),
        ),
    ]
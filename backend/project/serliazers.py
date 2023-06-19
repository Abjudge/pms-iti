from rest_framework import serializers
from .models import *
from django.db.models import fields

class Projectselizer(serializers.ModelSerializer):
    class Meta:
        model=Project
        fields ='__all__'

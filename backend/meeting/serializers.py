from rest_framework import serializers
from .models import *
from django.db.models import fields

class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = '__all__'
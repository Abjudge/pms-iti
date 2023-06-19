from rest_framework import serializers
from .models import *
from django.db.models import fields

class InformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Information_request
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

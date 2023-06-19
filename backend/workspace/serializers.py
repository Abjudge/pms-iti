from rest_framework import serializers
from .models import *
from django.db.models import fields

class Workspaceserializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    
    class Meta:
        model=Workspace
        fields ='__all__'
        
class WorkspaceMemberserializer(serializers.ModelSerializer):
    class Meta:
        model=WorkspaceMember
        fields ='__all__'

from rest_framework import serializers
from .models import *
from django.db.models import fields

class Workspaceserializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    
    class Meta:
        model=Workspace
        fields ='__all__'
        
class WorkspaceMemberSerializer(serializers.ModelSerializer):
    """
    Serializer for WorkspaceMember model.
    """


    class Meta:
        model = WorkspaceMember
        fields ='__all__'

  
class WorkspaceMemberListSerializer(serializers.ModelSerializer):
    """
    Serializer for WorkspaceMember model.
    """
    user_id = serializers.IntegerField(source='user_id.id')
    email = serializers.EmailField(source='user_id.email')
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()

    class Meta:
        model = WorkspaceMember
        fields = ['id', 'user_id','role', 'email', 'first_name', 'last_name']

    def get_first_name(self, obj):
        """
        Get the first name of the user associated with the WorkspaceMember.
        """
        return obj.user_id.first_name

    def get_last_name(self, obj):
        """
        Get the last name of the user associated with the WorkspaceMember.
        """
        return obj.user_id.last_name

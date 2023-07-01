from django.db import models
from workspace.models import Workspace
# Create your models here.
class Project(models.Model):
    name=models.CharField(max_length=50)
    description=models.CharField(max_length=250,blank=True)
    start_date=models.DateTimeField(blank=True)
    end_date=models.DateTimeField(blank=True)
    workspace_id = models.ForeignKey('workspace.Workspace', on_delete=models.CASCADE)
    clone_url=models.CharField(max_length=250,blank=True)
    repo_name=models.CharField(max_length=250,blank=True)
    def __str__(self):
        return self.name
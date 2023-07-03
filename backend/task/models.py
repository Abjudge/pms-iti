from django.db import models

# Create your models here.
from django.db import models
from project.models import Project

from accounts.models import UserAccount
# Create your models here.
class Task (models.Model):
    task_status = (
        ('s', 'TO Do'),
        ('p', 'In Progress'),
        ('t', 'Testing'),
        ('f', 'Failed'),
        ('d', 'Done'),
        ('c', 'Canceled'),
    )
    name=models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    estimated_duration = models.FloatField()
    actual_end_date = models.DateTimeField(blank=True, null=True)
    status =models.CharField(max_length=1,choices=task_status,default='s')
    project_id = models.ForeignKey('project.Project', on_delete=models.CASCADE)
    developer_id = models.ForeignKey('accounts.UserAccount', on_delete=models.CASCADE ,related_name='developer')
    tester_id = models.ForeignKey('accounts.UserAccount', on_delete=models.CASCADE,related_name='tester')
    owner_id = models.ForeignKey('accounts.UserAccount', on_delete=models.CASCADE,related_name='owner')
    attachment = models.FileField(upload_to='files/',blank=True,null=True)
    github_branch_name = models.CharField(max_length=50,blank=True,null=True)
    def __str__(self):
        return self.name
    
class Comment(models.Model):
    comment=models.CharField(max_length=250)
    task_id = models.ForeignKey('task.Task', on_delete=models.CASCADE)
    user_id = models.ForeignKey('accounts.UserAccount', on_delete=models.CASCADE)
    def __str__(self):
        return self.comment

class Information_request(models.Model):
    information_status = (
        ('o', 'Open'),
        ('c', 'Closed')
    )
    information_massage=models.CharField(max_length=250)
    creator_id = models.ForeignKey('accounts.UserAccount', on_delete=models.CASCADE ,related_name='creator')
    task_id = models.ForeignKey('task.Task', on_delete=models.CASCADE)
    receiver_id = models.ForeignKey('accounts.UserAccount', on_delete=models.CASCADE ,related_name='user')
    information_answer=models.CharField(max_length=250,blank=True)
    status =models.CharField(max_length=1,choices=information_status ,default='o')   
    def __str__(self):
        return self.information_massage

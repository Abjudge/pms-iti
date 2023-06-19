from django.db import models
from accounts.models import UserAccount


class Meeting (models.Model):
    title=models.CharField(max_length=50)
    reason=models.CharField(max_length=250)
    creator_id = models.ForeignKey('accounts.UserAccount', on_delete=models.CASCADE)
    start_date=models.DateTimeField()
    end_date=models.DateTimeField()
    meeting_link=models.CharField(max_length=100)
    meeting_member=models.ManyToManyField("accounts.UserAccount", related_name="meeting_member")
    def __str__(self):
        return self.title


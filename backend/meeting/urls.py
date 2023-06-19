from django.urls import path
from .views import *

urlpatterns = [
    path('',Meetinglist,name='Meetinglist'),
    path("<int:id>/",Meetinglist,name='Meetinglist'),
    path('create/',MeetingCreate,name='MeetingCreate'),
    path('update/<int:id>/',MeetingUpdate,name='MeetingUpdate'),
    path('delete/<int:id>/',MeetingDelete,name='MeetingDelete'),

]
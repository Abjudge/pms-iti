from django.urls import path
from .views import *

urlpatterns = [
    path('',Tasklist,name='Tasklist'),
    # path("<int:id>/",Tasklist,name='Tasklist'),
    # path('create/',TaskCreate,name='TaskCreate'),
    # path('update/<int:id>/',TaskUpdate,name='TaskUpdate'),
    # path('delete/<int:id>/',TaskDelete,name='TaskDelete'),
    # path('comment/<int:id>/',CommentCreate,name='CommentCreate'),
    path ('information/',Informationlist,name='Informationlist'),
    path('information/<int:id>/',Informationlist,name='Informationlist'),
    path("information/<str:status>/",Informationlist,name='Informationlist'),
    path("<int:task_id>/information/",Informationlist,name='Informationlist'),
    path('<int:task_id>/information/create/',InformationCreate,name='InformationCreate'),
    path('information/<int:id>/answer/', InformationAnswer ,name='InformationAnswer')


]
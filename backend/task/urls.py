from django.urls import path
from .views import *

urlpatterns = [
    path('',Tasklist,name='Tasklist'),
    path('project_id/<int:project_id>/',Tasklist,name='Tasklist'),
    path("id/<int:id>/",Tasklist,name='Tasklist'),
    path("status/<str:status>/project/<int:project_id>/",TasklistByProject,name='TasklistByProject'),
    path('create/',TaskCreate,name='TaskCreate'),
    
    path('update/<int:id>/',TaskUpdate,name='TaskUpdate'),
    path('update/<int:id>/status/<str:status>/',TaskUpdateStatus,name='TaskUpdateStatus'),
    path('delete/<int:id>/',TaskDelete,name='TaskDelete'),
    path('<int:id>/start/',StartTask,name='StartTask'),
    path('<int:id>/submit/',SubmitTask,name='SubmitTask'),
    path('<int:id>/setresult/<str:status>',TestTask,name='TestTask'),
    # path('<int:id>/cancel',CancelTask,name='CancelTask'),
    path('<int:id>/done/',donetask,name='donetask'),
    
    path('<int:id>/addcomment/',CommentCreate,name='CommentCreate'),
    path('comment/update/<int:id>/',CommentUpdate,name='CommentUpdate'),
    path('comment/delete/<int:id>/',CommentDelete,name='CommentDelete'),
    path('<int:id>/comment/',Commentlist,name='Commentlist'),
    
    
    
    path ('information/',Informationlist,name='Informationlist'),
    path('information/<int:id>/',Informationlist,name='Informationlist'),
    path("information/<str:status>/",Informationlist,name='Informationlist'),
    path("<int:task_id>/information/",Informationlist,name='Informationlist'),
    path('<int:task_id>/information/create/',InformationCreate,name='InformationCreate'),
    path('information/<int:id>/answer/', InformationAnswer ,name='InformationAnswer')


]

from django.urls import path
from .views import *
urlpatterns = [
    path('',ListProject),
    path('<int:id>',ListProject),
    path('Add',AddProject),
    path('Delete/<int:id>',DeleteProject),
    path('Update/<int:id>',UpdateProject),
    
]

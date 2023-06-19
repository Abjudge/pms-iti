from django.urls import path
from .views import *
urlpatterns = [
    path('',ListWorkspace),
    path('<int:id>',ListWorkspace),
    path('Add',AddWorkspace),
    path('Delete/<int:id>',DeleteWorkspace),
    path('Update/<int:id>',UpdateWorkspace),

]

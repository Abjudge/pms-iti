from django.urls import path
from .views import *
urlpatterns = [
    path('',ListWorkspace),
    path('<int:id>',ListWorkspace),
    path('Add',AddWorkspace),
    path('Delete/<int:id>',DeleteWorkspace),
    path('Update/<int:id>',UpdateWorkspace),
    path('<int:ws_id>/addmember' , addMember),
    path('members/deleteMember/<int:id>' , deleteMember),
    path('<int:ws_id>/members' ,listMembers ),
    path('members/updatemember/<int:id>' ,updateMember ),
    path('searchmembers/<str:name>',searchmember,name='searchusers')

]

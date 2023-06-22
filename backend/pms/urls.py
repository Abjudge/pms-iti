
from django.contrib import admin
from django.urls import path,include,re_path
from django.views.generic import TemplateView
from accounts.views import *
    # path('Tasks/',include('task.urls')),


from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [

    path('admin/', admin.site.urls),
    path('auth/',include('djoser.urls')),
    path('auth/',include('djoser.urls.jwt')),

    path('projects/',include('project.urls')),
    path('workspaces/',include('workspace.urls')),
    
    path('task/',include('task.urls')),
    path('meeting/',include('meeting.urls')),

] 
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
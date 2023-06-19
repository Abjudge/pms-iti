
from django.contrib import admin
from django.urls import path,include,re_path
from django.views.generic import TemplateView
from accounts.views import *
    # path('Tasks/',include('task.urls')),
urlpatterns = [

    path('admin/', admin.site.urls),
    path('overview',overview,name='overview'),
    path('welcome', welcome_user, name='welcome'),

    path('auth/',include('djoser.urls')),
    path('auth/',include('djoser.urls.jwt')),

    path('projects/',include('project.urls')),
    # path('workspace/',include('workspace.urls')),
    path('task/',include('task.urls')),
    path('meeting/',include('meeting.urls')),

]
urlpatterns += [re_path(r'^.*',TemplateView.as_view(template_name='index.html'))]
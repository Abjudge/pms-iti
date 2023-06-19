from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import *
from workspace.models import Workspace
from django.shortcuts import  get_object_or_404
from rest_framework.status import *
from django.db.models import Q

# @api_view(['GET'])
# def Tasklist(request,id=None):
#     if id:
#         task = Task.objects.filter(id=id)
#         serializer = TaskSerializer(task,many=True)
#         return Response(serializer.data)
#     else:    
#         user_id= request.user.id
#         Task.objects.filter(Q(developer_id=user_id) | Q(tester_id=user_id) | Q(owner_id=user_id))
#         serializer = TaskSerializer(task,many=True)
#         return Response(serializer.data)


# @api_view(['POST'])
# def TaskCreate(request):
#     user_id= request.user.id
#     user_role=
#     serializer = TaskSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data,status=HTTP_201_CREATED)
#     return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def Informationlist(request,id=None,status=None,task_id=None):
    if task_id:
        information = Information_request.objects.filter(task_id=task_id)
        serializer = InformationSerializer(information,many=True)
        return Response(serializer.data)    
        
    else:    
        user_id= request.user.id
        if id:
            information = Information_request.objects.filter(id=id)
            serializer = InformationSerializer(information,many=True)
            return Response(serializer.data)
        elif status:
            information = Information_request.objects.filter(Q(creator_id=user_id) | Q(receiver_id=user_id),status=status)
            serializer = InformationSerializer(information,many=True)
            return Response(serializer.data)
        else:
            
            information = Information_request.objects.filter(Q(creator_id=user_id) | Q(receiver_id=user_id))
            serializer = InformationSerializer(information,many=True)
            return Response(serializer.data)
        
        
@api_view(['POST'])
def InformationCreate(request,task_id):
    user_id= request.user.id

    request.data['creator_id']=user_id
    request.data['task_id']=task_id
    request.data['status']='o'
    serializer = InformationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def InformationAnswer(request,id):
    user_id= request.user.id
    information = Information_request.objects.get(id=id)
    print(information.status)
    print(information.receiver_id)
    print(user_id)
    if information.status=='o':
        request.data['status']='c'
        serializer = InformationSerializer(instance= information,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)
    else:
        return Response(status=HTTP_400_BAD_REQUEST, data="you can't answer this request or this request is already answered")
    

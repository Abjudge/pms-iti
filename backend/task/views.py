from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import *
from workspace.models import Workspace
from django.shortcuts import  get_object_or_404
from rest_framework.status import *
from django.db.models import Q

@api_view(['GET'])
def Tasklist(request,id=None,status=None,project_id=None):
    if project_id:
        task = Task.objects.filter(project_id=project_id)
        serializer = TaskSerializer(task,many=True)
        return Response(serializer.data)
    elif status:
        task = Task.objects.filter(status=status)
        serializer = TaskSerializer(task,many=True)
        return Response(serializer.data)
    
    else:
        user_id= request.user.id    
        if id:
            task = Task.objects.filter(id=id)
            serializer = TaskSerializer(task,many=True)
            return Response(serializer.data)
        else:    
            user_id= request.user.id
            Task.objects.filter(Q(developer_id=user_id) | Q(tester_id=user_id) | Q(owner_id=user_id))
            serializer = TaskSerializer(task,many=True)
            return Response(serializer.data)


@api_view(['POST'])
def TaskCreate(request):
    user_id= request.user.id
    request.data['owner_id']=user_id
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=HTTP_201_CREATED)
    return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def TaskDelete(request,id):
    user_id= request.user.id

    owner_id=get_object_or_404(Task,id=id).owner_id.id
    if user_id != owner_id:
        return Response(status=HTTP_400_BAD_REQUEST, data="you can't delete this task")
    else:
        task =get_object_or_404(Task,id=id)
        task.delete()
        return Response(status=HTTP_204_NO_CONTENT,data="task deleted successfully")


@api_view(['PUT'])
def TaskUpdate(request,id):
    user_id= request.user.id

    owner_id=get_object_or_404(Task,id=id).owner_id.id
    if user_id != owner_id :
        return Response(status=HTTP_400_BAD_REQUEST, data="you can't update this task")
    else:

        task=get_object_or_404(Task,id=id)
        serializer = TaskSerializer(instance= task,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def StartTask(request,id):
    user_id= request.user.id
    task=get_object_or_404(Task,id=id)
    if user_id == task.developer_id.id:
        request.data['status']='p'
        serializer = TaskSerializer(instance= task,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)
    else:
        return Response(status=HTTP_400_BAD_REQUEST, data="you can't start this task")
    
@api_view(['PUT'])
def SubmitTask(request,id):
    user_id= request.user.id
    task=get_object_or_404(Task,id=id)
    if user_id == task.tester_id.id:
        request.data['status']='t'
        serializer = TaskSerializer(instance= task,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)
    else:
        return Response(status=HTTP_400_BAD_REQUEST, data="you can't submit this task")
    

@api_view(['PUT'])
def TestTask(request,id,status):
    user_id= request.user.id
    task=get_object_or_404(Task,id=id)
    if status != 'f' and status != 'd':
        return Response(status=HTTP_400_BAD_REQUEST, data="status must be 'f' or 'd'")
    else:
        if user_id == task.tester_id.id:
            request.data['status']=status
            serializer = TaskSerializer(instance= task,data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)
        else:
            return Response(status=HTTP_400_BAD_REQUEST, data="you can't test this task")

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
    information=get_object_or_404(Information_request,id=id)
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
    

@api_view(['GET'])
def Commentlist(request,id):
    comment = Comment.objects.filter(task_id=id)
    serializer = CommentSerializer(comment,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def CommentCreate(request,id):
    user_id= request.user.id
    request.data['user_id']=user_id
    request.data['task_id']=id
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def CommentUpdate(request,id):
    user_id= request.user.id
    comment=get_object_or_404(Comment,id=id)
    if user_id == comment.user_id.id:
        serializer = CommentSerializer(instance= comment,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)
    else:
        return Response(status=HTTP_400_BAD_REQUEST, data="you can't update this comment")
    
@api_view(['DELETE'])
def CommentDelete(request,id):
    user_id= request.user.id
    comment=get_object_or_404(Comment,id=id)
    if user_id == comment.user_id.id:
        comment.delete()
        return Response(status=HTTP_204_NO_CONTENT,data="comment deleted successfully")
    else:
        return Response(status=HTTP_400_BAD_REQUEST, data="you can't delete this comment")
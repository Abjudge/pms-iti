# Create your views here.
from rest_framework.response import Response
from  rest_framework.decorators import  api_view
from .models import *
from .serializers import *
from rest_framework.status import *
from django.shortcuts import  get_object_or_404
from rest_framework.parsers import MultiPartParser,FormParser
import os
from django.conf import settings
from accounts.serializers import UserSerializer

@api_view(['DELETE'])
def DeleteWorkspace(req,id):
    data=get_object_or_404(Workspace,id=id)
    if data.image:
        print("****************************************")
        print(data.image)
        # delete the image file from the media directory
        image_path = os.path.join(settings.MEDIA_ROOT, data.image.name)
        try:
            os.remove(image_path)
        except (Exception):
            print("****************************************")
            print("*no image**",Exception)
            data.delete()
            return Response(status=HTTP_200_OK)
    data.delete()
    return Response(status=HTTP_200_OK)

@api_view(['PUT'])

def UpdateWorkspace(request,id):
    data={}
    data['image']=request.FILES['image']
    data['owner_id']=request.data["owner_id"]
    data['name']=request.data["name"]
    data['description']=request.data["description"]
    # delete old image
    updateobject=get_object_or_404(Workspace,id=id)
    if updateobject.image:
        print("****************************************")
        print(updateobject.image)
        # delete the image file from the media directory
        image_path = os.path.join(settings.MEDIA_ROOT, updateobject.image.name)
        try:
            os.remove(image_path)
        except (Exception):
            print("****************************************")
            print("*no image**",Exception)
    updateobjectafterupdate=Workspaceserializer(instance=updateobject,data=data)
    print("*********************************************************")
    print(updateobjectafterupdate)
    print(updateobjectafterupdate.is_valid())
    print(updateobjectafterupdate.errors)
    
    if(updateobjectafterupdate.is_valid()):
        updateobjectafterupdate.save()
        return Response(status=HTTP_200_OK,data=updateobjectafterupdate.data)
    return Response(status=HTTP_400_BAD_REQUEST,data={"detail":"not valid update data"})

@api_view(['POST'])

def AddWorkspace(request):


    item=Workspaceserializer(data=request.data)

    if(item.is_valid()):
        item.save()
        return  Response(status=HTTP_200_OK,data=item.data)
    else:
        return  Response(status=HTTP_400_BAD_REQUEST)



@api_view(['GET'])
def ListWorkspace(request):
    owner_workspaces=Workspace.objects.all().filter(owner_id=request.user.id)
    member_workspaces=WorkspaceMember.objects.all().filter(user_id=request.user.id)
    for i in owner_workspaces:
        Workspace_id=[] 
        Workspace_id.append(i.id)
    for j in member_workspaces:
        if j.Workspace_id.id not in Workspace_id:
            Workspace_id.append(j.Workspace_id.id)
            print(j.Workspace_id.id)
            workspace_member=Workspace.objects.all().filter(id=j.Workspace_id.id)
            owner_workspaces=owner_workspaces |workspace_member
    dataserlized=Workspaceserializer(owner_workspaces,many=True)

    return Response(status=HTTP_200_OK, data= dataserlized.data  )
    


@api_view(['POST'])
def addMember(request,ws_id):
    
    print("rooooooooooooooooooooooooole")
    print(request.data['role'])
    print("iiiiiiiiiiiiiiiiiiiiiid")
    print(request.data['user_id'])
    print("wwiiiiiiiiiiiiiiiiiiiiiiiiiid")
    print(request.data['Workspace_id'])
    data = request.POST.copy()    
       
    data['Workspace_id']=ws_id
    user_id=data['user_id']
    member_id=WorkspaceMember.objects.filter(user_id=user_id,Workspace_id=ws_id)
    print(member_id)
    print(type(member_id))
    if member_id : 
        return Response(status=HTTP_400_BAD_REQUEST , data='user is already a member in this worlspace')
          
    else:
    # print(request.data['Workspace_id'])
        
        memberserialized= WorkspaceMemberSerializer(data=data)
        if memberserialized.is_valid():
            memberserialized.save()
            return Response(status=HTTP_200_OK , data=memberserialized.data)
        print(memberserialized.errors)
    return Response(status=HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def listMembers(request, ws_id):
    members = WorkspaceMember.objects.filter(Workspace_id=ws_id)
    serializer = WorkspaceMemberListSerializer(members, many=True)
    return Response(serializer.data, status=HTTP_200_OK)

@api_view(['DELETE'])
def deleteMember(request,id):
    member = get_object_or_404(WorkspaceMember,id=id)
    member.delete()
    return Response(HTTP_200_OK)


@api_view(['PUT'])
def updateMember(request, id):
    member = get_object_or_404(WorkspaceMember, id=id)
    serializer = WorkspaceMemberSerializer(instance=member, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=HTTP_200_OK, data=serializer.data)
    return Response(status=HTTP_400_BAD_REQUEST, data={"detail": serializer.errors})


@api_view(['GET'])
def searchmember(request,name):
    users=UserAccount.objects.filter(email__contains=name)
    if users:
        serializer = UserSerializer(users, many=True)
        return Response(status=HTTP_200_OK, data=serializer.data)
    else:
        return Response(status=HTTP_400_BAD_REQUEST, data={"detail": "no users found"})

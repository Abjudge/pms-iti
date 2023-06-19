from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import *
from workspace.models import Workspace
from django.shortcuts import  get_object_or_404
from rest_framework.status import *
# Create your views here.

@api_view(['GET'])
def Meetinglist(request,id=None):
    if id:
        meeting = Meeting.objects.filter(id=id)
        serializer = MeetingSerializer(meeting,many=True)
        return Response(serializer.data)
    else:    
        user= request.user.id
        meeting = Meeting.objects.filter(meeting_member=user)
        serializer = MeetingSerializer(meeting,many=True)
        return Response(serializer.data)


@api_view(['POST'])
def MeetingCreate(request):
    # get the creator id from the request and add it to the data
    request.data['creator_id']=request.user.id
    # check if the creator is a member of the meeting and add him if not
    if request.user.id not in request.data['meeting_member']:
        request.data['meeting_member'].append(request.user.id)
    serializer = MeetingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])   
def MeetingDelete(request,id):
    user= request.user.id
    meeting = get_object_or_404(Meeting,id=id)
    if meeting.creator_id.id != user:
        return Response("You Can not DELETE the meeting You are not the creator of this meeting")
    else:    
        meeting.delete()
        return Response("Meeting Deleted")


@api_view(['PUT'])
def MeetingUpdate(request,id):
    user= request.user.id
    meeting = get_object_or_404(Meeting,id=id)
    if meeting.creator_id.id != user:
        return Response("You Can not UPDATE the meeting You are not the creator of this meeting")
    else:    
        serializer = MeetingSerializer(instance=meeting,data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(status=HTTP_202_ACCEPTED,data=serializer.data)

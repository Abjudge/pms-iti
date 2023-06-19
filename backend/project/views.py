# Create your views here.
from rest_framework.response import Response
from  rest_framework.decorators import  api_view
from .models import *
from .serializers import *
from rest_framework.status import *
from django.shortcuts import  get_object_or_404
# from rest_framework.permissions import  IsAdminUser,IsAuthenticated,IsAuthenticatedOrReadOnly
# from rest_framework import permissions,authentication
# from rest_framework.decorators import permission_classes
@api_view(['DELETE'])
def DeleteProject(req,id):
    data=get_object_or_404(Project,id=id)
    data.delete()
    return Response(status=HTTP_200_OK)

@api_view(['PUT'])

def UpdateProject(request,id):
    updateobject=get_object_or_404(Project,id=id)
        #Project1ser.
    updateobjectafterupdate=Projectselizer(instance=updateobject,data=request.data)
    if(updateobjectafterupdate.is_valid()):
        updateobjectafterupdate.save()
        return Response(status=HTTP_202_ACCEPTED,data=updateobjectafterupdate.data)
    return Response(status=HTTP_406_NOT_ACCEPTABLE,data={"detail":"not valid update data"})

@api_view(['POST'])
def AddProject(request):
    #Project.objects.create(name=request.data['name'])
    item=Projectselizer(data=request.data)
    
    if(item.is_valid()):
        item.save()
        return  Response(status=HTTP_200_OK ,data=item.data)
    else:
        return  Response(status=HTTP_417_EXPECTATION_FAILED)


@api_view(['GET'])
def ListProject(request,id=None):
    #select all catgory from model
    if(id is not None):
        data=get_object_or_404(Project,id=id)
        dataserlized=Projectselizer(data)
        return Response(status=HTTP_202_ACCEPTED, data={'data': dataserlized.data})
    else:
        data=Project.objects.all()
        dataserlized=Projectselizer(data,many=True)
        return Response(status=HTTP_207_MULTI_STATUS,data={'data':dataserlized.data})




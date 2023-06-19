from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
# Create your views here.
from rest_framework.response import Response

from django.http import JsonResponse

# @authentication_classes([SessionAuthentication])
# @permission_classes([IsAuthenticated])


@api_view(['GET'])
def overview(request):
    print(type(request))
    api_endpoint={
        'overview':'/',
        'AllCatagory':'/AllCatagory & get method',
        'AddCatagoty':'/AddCatagory & post method'
    }
    return  Response(api_endpoint)
@api_view(['GET'])
def welcome_user(request):
    user = request.user
    message = f"Welcome, {user.email} {user.id}!"
    print("**********************************************************")
    print(message)
    return JsonResponse({'message': message})



from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
# Create your views here.
from rest_framework.response import Response

from django.http import JsonResponse

# @authentication_classes([SessionAuthentication])
# @permission_classes([IsAuthenticated])

from rest_framework.response import Response

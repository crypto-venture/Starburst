from django.shortcuts import render
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import CustomUserSerializer
# Create your views here.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        # Add extra responses here
        data['username'] = self.user.username
        data['bio'] = self.user.bio
        data['email'] = self.user.email
       	data['id'] = self.user.id
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                json['id'] = user.id
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ReturnedUser(APIView):
    # permission_classes = (permissions.AllowAny,)

    def get(self, request):
        user = request.user
        return Response({
            "username" : user.username,
            "email" : user.email,
            "bio" : user.bio,
            "id" : user.id
            })

class HelloWorld(APIView):
    def get(self, request):
        return Response({
            "hello" : "world"
            })

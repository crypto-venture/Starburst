from django.shortcuts import render
from django.views import generic
from .models import Post
from django.http import JsonResponse
from rest_framework import status, permissions
from rest_framework.views import APIView
from typing import List
from rest_framework.response import Response
from authentication.models import CustomUser
from django.core import serializers
import json
# Create your views here.

class PostList(APIView):
	def get(self, request):
		queryset = list(Post.objects.values().order_by('-created_on'))
		for post in queryset:
			someId = post['author_id']
			del post['author_id']
			post['author'] = CustomUser.objects.filter(id=someId).values()[0]['username']
		return JsonResponse(list(queryset), safe=False)

class PostDetail(APIView):
	def post(self, request):
		try:
			queryset = list(Post.objects.filter(pk=request.data['id']))
			if len(queryset) == 0:
				return Response({
				"Error" : "Post not found"
				}, status=status.HTTP_400_BAD_REQUEST)
		except Exception as ex:
			return Response({
				"Error" : "Post not found"
				}, status=status.HTTP_400_BAD_REQUEST)

		post = queryset[0]
		serialized_post = json.loads(serializers.serialize('json', [ post, ]))
		serialized_post[0]['fields']['author'] = CustomUser.objects.filter(id=serialized_post[0]['fields']['author']).values()[0]['username']
		return Response(serialized_post, status=status.HTTP_201_CREATED)

class CreatePost(APIView):
	def post(self, request):
		data = request.data
		user = request.user	
		post = Post.objects.create(title=data['title'], content=data['content'], author=user)
		serialized_post = json.loads(serializers.serialize('json', [ post, ]))
		del serialized_post[0]['fields']['author']
		serialized_post[0]['fields']['author'] = user.username
		return Response(serialized_post, status=status.HTTP_201_CREATED)

from django.db import models
from authentication.models import CustomUser
# Create your models here.

class Post(models.Model):
	title = models.CharField(max_length=200, unique=True)
	content = models.TextField()
	author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='blog_posts')
	created_on = models.DateTimeField(auto_now=True)
	likes = models.IntegerField(default=0)
	users_reaction = models.ManyToManyField(CustomUser, blank=True)

	class Meta:
		ordering = ['-created_on']

	def __str__(self):
		return self.title

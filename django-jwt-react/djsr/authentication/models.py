from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models
class CustomUser(AbstractUser):
    image = models.ImageField(upload_to='images')
    bio = models.TextField()
    
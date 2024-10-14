from django.contrib.auth.models import AbstractUser

from django.db import models


class User(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)

    def __str__(self):
        return f"{self.email}"
    
    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        ordering = ["email"]

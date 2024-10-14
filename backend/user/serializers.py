import re
from django.contrib.auth import get_user_model
from django.db import transaction

from rest_framework import serializers

from basket.models import Basket


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("id", "email", "first_name", "last_name", "password", "is_staff")
        read_only_fields = ("id", "is_staff")
        extra_kwargs = {
            "password": {"write_only": True, "min_length": 8}
        }

    def create(self, validated_data):
        validated_data.pop('username', None)
        with transaction.atomic():
          user = get_user_model().objects.create_user(**validated_data)
          Basket.objects.create(user=user)
          return user
    
    def validate_password(self, password):
        if not re.search(r'\d', password):
            raise serializers.ValidationError("Password must contain at least one digit.")
        if not re.search(r'[A-Z]', password):
            raise serializers.ValidationError("Password must contain at least one uppercase letter.")
        return password

    def validate_email(self, email):
        if get_user_model().objects.filter(email=email).exists():
            raise serializers.ValidationError("User with this email already exists.")
        return email

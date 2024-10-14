from rest_framework import serializers
from basket.models import Basket


class BasketSerializer(serializers.ModelSerializer):
    class Meta:
        models = Basket
        fields = ("id", "user", "total_price", "products")


class BasketListSerializer(serializers.ModelSerializer):
    email = serializers.CharField(source="user.email", read_only=True)
    class Meta:
        models = Basket
        fields = ("id", "email", "total_price", "products")
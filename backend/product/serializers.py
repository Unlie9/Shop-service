from rest_framework import serializers
from product.models import Product


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source="category.name", read_only=True)
    class Meta:
        model = Product
        fields = ("id", "name", "price", "category", "tags")

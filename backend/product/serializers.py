from rest_framework import serializers
from tag.serializers import TagSerializer
from product.models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ("id", "name", "price", "image", "category", "tags")

class ProductListSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source="category.name", read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = ("id", "name", "price", "image", "category", "tags")

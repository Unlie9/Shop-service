from rest_framework import serializers
from product.serializers import ProductSerializer
from basket.models import Basket


class BasketListSerializer(serializers.ModelSerializer):
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    products = ProductSerializer(many=True, read_only=True)  
    email = serializers.CharField(source="user.email", read_only=True)
    total_price = serializers.SerializerMethodField()
    class Meta:
        model = Basket
        fields = ("id", "email", "total_price", "products")

    def get_total_price(self, obj):
        return obj.calculate_total_price()

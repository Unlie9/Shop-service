from django.db import transaction
from rest_framework import viewsets

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from basket.serializers import BasketListSerializer
from basket.models import Basket
from product.models import Product


class BasketListView(viewsets.ModelViewSet):
    serializer_class = BasketListSerializer
    
    def get_queryset(self):
        user = self.request.user
        return Basket.objects.filter(user=user)
    
    @transaction.atomic
    @action(detail=True, methods=["post"], url_path="add-product")
    def add_product_to_basket(self, request, pk=None):
        basket = self.get_object()
        product_id = request.data.get("product_id")

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"Product not found"}, status=status.HTTP_404_NOT_FOUND)
        
        basket.products.add(product)
        basket.calculate_total_price()
        basket.save()
        
        return Response({"Product added to your basket"}, status=status.HTTP_200_OK)
    
    @transaction.atomic
    @action(detail=True, methods=["post"], url_path="remove-product")
    def remove_product_from_basket(self, request, pk=None):
        basket = self.get_object()
        product_id = request.data.get("product_id")

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"Product not found"}, status=status.HTTP_404_NOT_FOUND)
        
        basket.products.remove(product)
        basket.calculate_total_price()
        basket.save()

        return Response({"Product removed from your basket"}, status=status.HTTP_200_OK)

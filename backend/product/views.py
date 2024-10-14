from rest_framework import generics

from product.serializers import ProductSerializer
from product.models import Product


class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

from rest_framework.permissions import IsAdminUser
from rest_framework import generics, viewsets

from product.serializers import ProductSerializer, ProductListSerializer
from product.models import Product


class ProductBaseView:
    serializer_class = ProductListSerializer
    queryset = Product.objects.all()


class ProductListView(ProductBaseView, generics.ListAPIView):
    pass


class ProductAdminView(ProductBaseView, viewsets.ModelViewSet):
    permission_classes = (IsAdminUser,)

    def get_serializer_class(self):
        if self.action == "create":
            return ProductSerializer
        return self.serializer_class

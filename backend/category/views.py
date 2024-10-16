from rest_framework.permissions import IsAdminUser
from rest_framework import generics, viewsets

from category.serializers import CategorySerializer
from category.models import Category


class CategoryBaseView:
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class CategoryListView(CategoryBaseView, generics.ListAPIView):
    pass


class CategoryAdminView(CategoryBaseView, viewsets.ModelViewSet):
    permission_classes = (IsAdminUser,)

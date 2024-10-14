from rest_framework import generics

from category.serializers import CategorySerializer
from category.models import Category


class CategoryListView(generics.ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

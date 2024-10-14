from rest_framework import generics

from tag.serializers import TagSerializer
from tag.models import Tag


class TagListView(generics.ListAPIView):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()

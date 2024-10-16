from rest_framework.permissions import IsAdminUser
from rest_framework import generics, viewsets


from tag.serializers import TagSerializer
from tag.models import Tag


class TagBaseView:
    serializer_class = TagSerializer
    queryset = Tag.objects.all()


class TagListView(TagBaseView, generics.ListAPIView):
    pass


class TagAdminView(TagBaseView, viewsets.ModelViewSet):
    permission_classes = (IsAdminUser,)
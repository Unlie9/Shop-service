from django.urls import path
from tag.views import TagListView


app_name = "tag"

urlpatterns = [
  path("", TagListView.as_view(), name="list")
]
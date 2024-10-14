from rest_framework.routers import DefaultRouter
from django.urls import path, include
from tag.views import TagListView, TagAdminView


router = DefaultRouter()
router.register(r"admin", TagAdminView, basename="tag")

urlpatterns = [
  path("user/", TagListView.as_view(), name="list"),
  path("", include(router.urls))
]

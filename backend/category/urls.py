from rest_framework.routers import DefaultRouter
from django.urls import path, include
from category.views import CategoryListView, CategoryAdminView


router = DefaultRouter()
router.register(r"admin", CategoryAdminView, basename="category")

urlpatterns = [
  path("user", CategoryListView.as_view(), name="list"),
  path("", include(router.urls))
]

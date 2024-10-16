from rest_framework.routers import DefaultRouter
from django.urls import path, include
from product.views import ProductListView, ProductAdminView


router = DefaultRouter()
router.register(r"admin", ProductAdminView, basename="product")

urlpatterns = [
  path("user/", ProductListView.as_view(), name="list"),
  path("", include(router.urls))
]
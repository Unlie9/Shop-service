from django.urls import path
from product.views import ProductListView

app_name = "product"

urlpatterns = [
  path("", ProductListView.as_view(), name="list")
]
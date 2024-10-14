from django.urls import path
from basket.views import BasketListView

app_name = "basket"

urlpatterns = [
  path("", BasketListView.as_view(), name="list")
]


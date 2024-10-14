from django.urls import path

from basket.views import BasketListView


app_name = "basket"

urlpatterns = [
  path("list/", BasketListView.as_view(), name="list"),
]

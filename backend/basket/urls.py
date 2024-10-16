from rest_framework.routers import DefaultRouter
from django.urls import path, include
from basket.views import BasketListView


router = DefaultRouter()
router.register(r"", BasketListView, basename="basket")

urlpatterns = [
    path('', include(router.urls)),
]

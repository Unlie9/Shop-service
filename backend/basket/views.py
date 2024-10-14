from django.shortcuts import render

from rest_framework import generics

from basket.serializers import BasketSerializer, BasketListSerializer
from basket.models import Basket


class BasketListView(generics.ListAPIView):
    serializer_class = BasketListSerializer
    queryset = Basket.objects.all()
  

from django.shortcuts import render

from rest_framework import generics
from rest_framework import viewsets

from rest_framework.permissions import IsAdminUser

from basket.serializers import BasketListSerializer
from basket.models import Basket


class BasketListView(generics.ListAPIView):
    serializer_class = BasketListSerializer
    
    def get_queryset(self):
        user = self.request.user
        return Basket.objects.filter(user=user)

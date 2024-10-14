from django.contrib import admin
from .models import Product


class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "price")  
    search_fields = ("name", "description")  
    list_filter = ("price",)  
    ordering = ("name", "price")  

admin.site.register(Product, ProductAdmin)
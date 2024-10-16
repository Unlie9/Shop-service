from django.contrib import admin
from .models import Basket


class BasketAdmin(admin.ModelAdmin):
    list_display = ("user", "total_price", "display_products")  
    search_fields = ("user__email",) 
    list_filter = ("total_price",)
    ordering = ("user", "total_price")
    filter_horizontal = ("products",)

    def display_products(self, obj):
        return ", ".join([product.name for product in obj.products.all()])
    display_products.short_description = "Products"

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)


admin.site.register(Basket, BasketAdmin)

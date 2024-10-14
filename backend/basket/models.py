from django.db import models
from django.conf import settings

from product.models import Product


class Basket(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="basket"
    )
    products = models.ManyToManyField(Product, related_name="basket")
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    class Meta:
        verbose_name = "Basket"
        verbose_name_plural = "Baskets"
        ordering = ["user", "total_price"]

    def __str__(self):
        return f"Basket for {self.user.email}"
    
    def calculate_total_price(self):
        self.total_price = sum([product.price for product in self.products.all()])
        return self.total_price
    
    def get_products_info(self):
        ...

from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=32)
    description = models.TextField(max_length=1024)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    # TODO add image field
    # image = ""

    def __str__(self):
        return f"{self.name} - {self.price}"

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"
        ordering = ["name", "price"]

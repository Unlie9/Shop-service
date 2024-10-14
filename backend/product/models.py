from django.db import models
from tag.models import Tag
from category.models import Category


class Product(models.Model):
    name = models.CharField(max_length=32)
    description = models.TextField(max_length=1024)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    tags = models.ManyToManyField(Tag)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    # TODO add image field
    # image = models.ImageField(upload_to='/', blank=True, null=True)  

    def __str__(self):
        return f"{self.name} - {self.price}"

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"
        ordering = ["name", "price"]

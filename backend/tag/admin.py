from django.contrib import admin
from .models import Tag


class TagAdmin(admin.ModelAdmin):
    list_display = ("name",)  
    search_fields = ("name",)  
    ordering = ("name",)

admin.site.register(Tag, TagAdmin)

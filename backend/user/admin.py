from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


class CustomUserAdmin(UserAdmin):
    list_display = ("email", "first_name", "last_name", "is_staff", "is_superuser")
    search_fields = ("email", "first_name", "last_name") 
    list_filter = ("is_staff", "is_superuser", "is_active") 
    ordering = ("email",)
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal Info", {"fields": ("first_name", "last_name")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "password1", "password2", "first_name", "last_name", "is_staff", "is_superuser"),
        }),
    )

admin.site.register(User, CustomUserAdmin)

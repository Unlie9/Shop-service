from django.urls import path
from user.views import CreateUserView, ManagerUserView


app_name = "user"

urlpatterns = [
    path("register", CreateUserView.as_view(), name="create"),
    path("me/", ManagerUserView.as_view(), name="manage_user"),
]

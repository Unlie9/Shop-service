from django.urls import path
from notification.consumers import AdminNotificationConsumer

websocket_urlpatterns = [
    path("ws/admin/notifications/", AdminNotificationConsumer.as_asgi()),
]

from rest_framework import generics
from rest_framework.permissions import AllowAny

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

from user.serializers import UserSerializer
from notification.tasks import send_registration_notification


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

    def perform_create(self, serializer):
        user = serializer.save()
        send_registration_notification(user.username)
        
class ManagerUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

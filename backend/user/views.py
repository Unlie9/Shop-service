from rest_framework import generics

from user.serializers import UserSerializer


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer


class ManagerUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    # permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user

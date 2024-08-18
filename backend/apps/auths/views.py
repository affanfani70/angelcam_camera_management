import requests
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView)

from .models import User


class LoginView(TokenObtainPairView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        token = request.data.get("token")
        if not token or len(token) != 40:
            return Response(
                {"error": "Invalid token length"}, status=status.HTTP_400_BAD_REQUEST
            )

        headers = {"Authorization": f"PersonalAccessToken {token}"}
        response = requests.get("https://api.angelcam.com/v1/me/", headers=headers)

        if response.status_code == 200:
            username = response.json().get("id")
            if not username:
                return Response(
                    {"error": "Username not provided in response"}, status=status.HTTP_400_BAD_REQUEST
                )
            user, created = User.objects.get_or_create(username=username)

            user.token = token  
            user.save()

            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            return Response(
                {
                    "message": "Login successful",
                    "result": response.json(),
                    "access_token": access_token,
                    "refresh_token": refresh_token,
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"error": "Failed to authenticate"}, status=response.status_code
            )

class RefreshTokenView(TokenRefreshView):
    permission_classes = (AllowAny,)

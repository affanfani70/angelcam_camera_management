import requests
from django.conf import settings
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from ..auths.models import User


class SharedCamerasView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, camera_id=None):
        user = User.objects.get(username=request.user.username) 
       
        user_token = getattr(user, 'token', None)

        if not user_token:
            return Response(
                {"error": "User token not found"}, status=status.HTTP_400_BAD_REQUEST
            )

        endpoint = (
            f"https://api.angelcam.com/v1/shared-cameras/{camera_id}/"
            if camera_id
            else "https://api.angelcam.com/v1/shared-cameras/"
        )

        headers = {"Authorization": f"PersonalAccessToken {user_token}"}

        try:
            response = requests.get(endpoint, headers=headers)

            if response.status_code == 200:
                return Response(response.json(), status=status.HTTP_200_OK)
            else:
                return Response(
                    {
                        "error": "Failed to retrieve shared cameras",
                        "details": response.json(),
                    },
                    status=response.status_code,
                )

        except requests.RequestException as e:
            return Response(
                {"error": f"Request failed: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

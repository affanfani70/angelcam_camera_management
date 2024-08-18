from django.urls import path

from . import views

urlpatterns = [
    path('shared-cameras/', views.SharedCamerasView.as_view(), name='shared_cameras'),
    path('shared-cameras/<int:camera_id>/', views.SharedCamerasView.as_view(), name='shared_cameras_detail'),
]

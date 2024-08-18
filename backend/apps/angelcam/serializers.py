from rest_framework import serializers


class CameraSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=255)
    type = serializers.CharField(max_length=50)
    snapshot = serializers.DictField()  # Can be replaced with a custom serializer if needed
    status = serializers.CharField(max_length=50)
    live_snapshot = serializers.URLField()
    streams = serializers.ListField(child=serializers.DictField())
    applications = serializers.ListField(child=serializers.DictField())
    owner = serializers.DictField()  # Can be replaced with a custom serializer if needed
    has_recording = serializers.BooleanField()
    has_notifications = serializers.BooleanField()
    audio_enabled = serializers.BooleanField()
    low_latency_enabled = serializers.BooleanField()

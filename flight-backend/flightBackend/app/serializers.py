from rest_framework import serializers
from .models import FlightRequest, AircraftRequest, InstructorRequest
from django.contrib.auth.models import User

class FlightRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlightRequest
        fields = '__all__'

class AircraftRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = AircraftRequest
        fields = '__all__'

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'password')
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class InstructorRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstructorRequest
        fields = '__all__'


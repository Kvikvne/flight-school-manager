from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import FlightRequest, AircraftRequest, InstructorRequest
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import SignupSerializer, LoginSerializer



from django.contrib.auth import authenticate
from .serializers import FlightRequestSerializer, AircraftRequestSerializer, InstructorRequestSerializer

class FlightRequestAPI(APIView):
    def get(self, request):
        flight_requests = FlightRequest.objects.all()
        serializer = FlightRequestSerializer(flight_requests, many=True)
        return Response(serializer.data)
    

    def post(self, request, format=None):
        print(request.data)  # Print the raw request data
        serializer = FlightRequestSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        print(serializer.errors)
        return Response(serializer.errors, status=400)

    def options(self, request, *args, **kwargs):
        # Handle preflight requests for CORS
        response = super().options(request, *args, **kwargs)
        response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        return response

# add available aircraft
class AircraftRequestAPI(APIView):
    def get(self, request):
        available_aircraft = AircraftRequest.objects.all()
        serializer = AircraftRequestSerializer(available_aircraft, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        print(request.data)  # Print the raw request data
        serializer = AircraftRequestSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        print(serializer.errors)
        return Response(serializer.errors, status=400)
    
    def options(self, request, *args, **kwargs):
        # Handle preflight requests for CORS
        response = super().options(request, *args, **kwargs)
        response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        return response
    
    def get_object(self, pk):
        try:
            return AircraftRequest.objects.get(pk=pk)
        except AircraftRequest.DoesNotExist:
            return None
    
    def delete(self, request, pk, format=None):
        aircraft_request = self.get_object(pk)
        if aircraft_request is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        aircraft_request.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class InstructorRequestAPI(APIView):
    def get(self, request):
        available_aircraft = InstructorRequest.objects.all()
        serializer = InstructorRequestSerializer(available_aircraft, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        print(request.data)  # Print the raw request data
        serializer = InstructorRequestSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        print(serializer.errors)
        return Response(serializer.errors, status=400)
    
    def options(self, request, *args, **kwargs):
        # Handle preflight requests for CORS
        response = super().options(request, *args, **kwargs)
        response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        return response
    
    def get_object(self, pk):
        try:
            return InstructorRequest.objects.get(pk=pk)
        except InstructorRequest.DoesNotExist:
            return None
    
    def delete(self, request, pk, format=None):
        aircraft_request = self.get_object(pk)
        if aircraft_request is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        aircraft_request.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class FlightRequestListAPI(APIView):
    def get(self, request):
        flight_requests = FlightRequest.objects.all()
        serializer = FlightRequestSerializer(flight_requests, many=True)
        return Response(serializer.data)
    


class FlightRequestDetailView(APIView):
    def get_object(self, pk):
        try:
            return FlightRequest.objects.get(pk=pk)
        except FlightRequest.DoesNotExist:
            return None

    def get(self, request, pk, format=None):
        flight_request = self.get_object(pk)
        if flight_request is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = FlightRequestSerializer(flight_request)
        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        flight_request = self.get_object(pk)
        if flight_request is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        flight_request.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class SignupView(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    def post(self, request):
        print(request.data)  # Debug: Check the received data
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(username=username, password=password)
            if user:
                print("User authenticated:", user.username)  # Debug: Check the authenticated user
                token, _ = Token.objects.get_or_create(user=user)
                return Response({'token': token.key}, status=status.HTTP_200_OK)
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        # Delete the user's authentication token
        request.auth.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

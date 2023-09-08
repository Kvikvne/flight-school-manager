from django.contrib import admin
from django.urls import path
from app.views import FlightRequestAPI, FlightRequestListAPI, FlightRequestDetailView, AircraftRequestAPI, SignupView, LoginView, LogoutView, InstructorRequestAPI

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/submit-flight-request/', FlightRequestAPI.as_view(), name='api-submit-flight-request'),
    path('api/submit-aircraft-availability/', AircraftRequestAPI.as_view(), name='api-submit-aircraft-availability'),
    path('api/flight-requests/', FlightRequestListAPI.as_view(), name='api-flight-requests'),
    path('api/flight-requests/<int:pk>/', FlightRequestDetailView.as_view(), name='flight-request-detail'),
    path('api/submit-aircraft-availability/<int:pk>/', AircraftRequestAPI.as_view(), name='aircraft-request-detail'),
    path('api/signup/', SignupView.as_view(), name='signup'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/logout/', LogoutView.as_view(), name='api-logout'),
    path('api/submit-insturctor-blocks/', InstructorRequestAPI.as_view(), name='api-insturctor-blocks'),
    path('api/submit-insturctor-blocks/<int:pk>/', InstructorRequestAPI.as_view(), name='api-insturctor-blocks'),
]

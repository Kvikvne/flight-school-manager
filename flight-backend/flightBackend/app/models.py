from django.db import models

class FlightRequest(models.Model):
    email = models.EmailField()
    day_of_week = models.CharField(max_length=20)
    time_of_day = models.CharField(max_length=20)
    flying_amount = models.CharField(max_length=50)
    instructor = models.CharField(max_length=50)
    time_with_instructor = models.CharField(max_length=50)
    training_type = models.CharField(max_length=100)
    special_requests = models.CharField(max_length=200)

class AircraftRequest(models.Model):
    aircraft_category = models.CharField(max_length=20)
    aircraft_availability_day = models.CharField(max_length=20)
    aircraft_start_time = models.CharField(max_length=20)
    aircraft_end_time = models.CharField(max_length=20)
    aircraft_name = models.CharField(max_length=20)

class InstructorRequest(models.Model):
    Instructor_name = models.CharField(max_length=20)
    ground_blocks = models.CharField(max_length=20)
    duel_blocks = models.CharField(max_length=20)
    Instructor_email = models.EmailField(default='default')
    training_type = models.CharField(max_length=100, default="default")
    day_available = models.CharField(max_length=100, default="default")




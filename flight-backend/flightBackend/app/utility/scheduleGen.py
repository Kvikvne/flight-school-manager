import itertools
import csv
from app.models import FlightRequest, InstructorRequest
from django.http import HttpResponse


def generate_schedule_csv():
    student_requests = FlightRequest.objects.all()
    instructor_requests = InstructorRequest.objects.all()

    for student_request in student_requests:
        student_email = student_request.email
        day_requested = student_request.day_of_week.split(", ")
        instructor_requested = student_request.instructor
        training_requested = student_request.training_type.split(", ")
        blocks_requested = int(student_request.student_ground_blocks)
        time_requested = student_request.time_request.split(", ")

        # Process student data here

    for instructor_request in instructor_requests:
        name = instructor_request.Instructor_name
        inst_training = instructor_request.training_type.split(", ")
        day_available = instructor_request.day_available.split(", ")
        time_available = instructor_request.instructor_times.split(", ")

    # Generate all possible combinations of time and day
    times = [
        "0700-0900",
        "0800-1000",
        "1000-1200",
        "1200-1400",
        "1400-1600",
        "1600-1800",
        "1800-2000",
        "1900-2100",
    ]
    days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ]
    combinations = list(itertools.product(times, days))

    # Initialize the schedule as an empty dictionary
    schedule = {combo: None for combo in combinations}

    # Check instructor availability and assign if available
    assigned_blocks = 0
    for day in day_requested:
        for time in time_requested:
            for combo in combinations:
                if combo[0] == time and combo[1] == day:
                    if (
                        assigned_blocks < blocks_requested
                        and instructor_requested
                        == name  # Use "name" as the instructor's name
                        and any(
                            training in inst_training for training in training_requested
                        )
                    ):
                        for instructor_time in time_available:
                            if instructor_time == combo[0] and day in day_available:
                                schedule[combo] = student_email
                                assigned_blocks += 1

    # Check instructor availability and assign if available
    for day in day_available:
        for time in time_available:
            for combo in combinations:
                if combo[0] == time and combo[1] == day and schedule[combo] is None:
                    schedule[combo] = name  # Use "name" as the instructor's name

    # Create a CSV file in-memory
    response = HttpResponse(content_type="text/csv")
    response["Content-Disposition"] = 'attachment; filename="schedule.csv"'

    writer = csv.writer(response)

    # Write the header row with days as column names
    header = ["Time/Day"] + days
    writer.writerow(header)

    # Write the schedule
    for time in times:
        row = [time]
        for day in days:
            combo = (time, day)
            row.append(schedule[combo] if schedule[combo] else "")
        writer.writerow(row)
    
    print("Schedule has been created and saved as 'schedule.csv'.")
    return response

# Generated by Django 4.2.4 on 2023-09-09 21:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0013_alter_flightrequest_student_end_time_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='flightrequest',
            name='time_of_day',
        ),
    ]

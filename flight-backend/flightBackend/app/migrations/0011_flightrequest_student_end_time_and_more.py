# Generated by Django 4.2.4 on 2023-09-09 21:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_rename_student_blocks_flightrequest_student_ground_blocks'),
    ]

    operations = [
        migrations.AddField(
            model_name='flightrequest',
            name='student_end_time',
            field=models.CharField(default='default', max_length=20),
        ),
        migrations.AddField(
            model_name='flightrequest',
            name='student_start_time',
            field=models.CharField(default='default', max_length=20),
        ),
    ]

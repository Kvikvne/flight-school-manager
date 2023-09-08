# Generated by Django 4.2.4 on 2023-09-01 00:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_delete_customuser'),
    ]

    operations = [
        migrations.CreateModel(
            name='InstructorRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Instructor_name', models.CharField(max_length=20)),
                ('Instructor_day_blocks', models.CharField(max_length=20)),
                ('Instructor_week_blocks', models.CharField(max_length=20)),
            ],
        ),
        migrations.AlterField(
            model_name='flightrequest',
            name='training_type',
            field=models.CharField(max_length=100),
        ),
    ]

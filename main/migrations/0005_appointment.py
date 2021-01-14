# Generated by Django 3.1.4 on 2021-01-13 19:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_doctor_profile'),
    ]

    operations = [
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('from_patient_name', models.CharField(max_length=300, null=True)),
                ('from_patient_email', models.CharField(max_length=300, null=True)),
                ('time', models.CharField(max_length=200, null=True)),
                ('date', models.CharField(max_length=200, null=True)),
                ('doctor_mail', models.EmailField(max_length=300, null=True)),
                ('message', models.TextField(max_length=400, null=True)),
            ],
        ),
    ]

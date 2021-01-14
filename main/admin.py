from django.contrib import admin
from .models import patient_profile, doctor_profile,Appointment,Medical_history

# Register your models here.
admin.site.register(patient_profile)
admin.site.register(doctor_profile)
admin.site.register(Appointment)
admin.site.register(Medical_history)
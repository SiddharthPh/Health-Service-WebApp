from django.contrib import admin
from .models import *

# Register your models here.
class PatientAdmin(admin.ModelAdmin):
    readonly_fields=('date_created',)
class DoctorAdmin(admin.ModelAdmin):
    readonly_fields=('date_created',)
class PhysicianAdmin(admin.ModelAdmin):
    readonly_fields=('date_created',)

admin.site.register(Patient,PatientAdmin)
admin.site.register(Doctor,DoctorAdmin)
admin.site.register(Physician,PhysicianAdmin)
from django.urls import path
from . import views

urlpatterns = [
        path('patient',views.patient_home, name="patient_home"),
        path('doctor',views.doctor_home,name="doctor_home"),
        path('logout',views.logout,name="logout"),
        path('appointment',views.appointment,name="appointment"),
        path('medical_history_check',views.medical_history_check,name="medical_history_check"),

]
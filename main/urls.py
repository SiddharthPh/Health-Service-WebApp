from django.urls import path
from . import views

urlpatterns = [
        path('patient',views.patient_home, name="patient_home"),
        path('logout',views.logout,name="logout")

]
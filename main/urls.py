from django.urls import path
from . import views
from .views import line_chart_json, line_chart, bmi_chart, bmi_chart_json,bp_chart,bp_chart_json, sc_chart,sc_chart_json, ecg_chart,ecg_chart_json, o2_chart,o2_chart_json, pulse_chart, pulse_chart_json,rr_chart, rr_chart_json, hb_chart, hb_chart_json
urlpatterns = [
        path('patient',views.patient_home, name="patient_home"),
        path('doctor',views.doctor_home,name="doctor_home"),
        path('logout',views.logout,name="logout"),
        path('appointment',views.appointment,name="appointment"),
        path('medical_history_check',views.medical_history_check,name="medical_history_check"),
        path('medical_history_obj',views.medical_history_obj,name="medical_history_obj"),
        path('chart', line_chart, name='line_chart'),
        path('chartJSON', line_chart_json, name='line_chart_json'),
        path('chart1',bmi_chart, name='bmi_chart'),
        path('chartJSON1', bmi_chart_json, name='bmi_chart_json'),
        path('chart2',bp_chart, name='bp_chart'),
        path('chartJSON2', bp_chart_json, name='bp_chart_json'),
        path('chart3',sc_chart, name='sc_chart'),
        path('chartJSON3', sc_chart_json, name='sc_chart_json'),
        path('chart4',pulse_chart, name='pulse_chart'),
        path('chartJSON4', pulse_chart_json, name='pulse_chart_json'),
        path('chart5',o2_chart, name='o2_chart'),
        path('chartJSON5', o2_chart_json, name='o2_chart_json'),
        path('chart6',rr_chart, name='rr_chart'),
        path('chartJSON6', rr_chart_json, name='rr_chart_json'),
        path('chart7',ecg_chart, name='ecg_chart'),
        path('chartJSON7', ecg_chart_json, name='ecg_chart_json'),
        path('chart8',hb_chart, name='hb_chart'),
        path('chartJSON8', hb_chart_json, name='hb_chart_json'),

        path('checkdisease', views.checkdisease, name="checkdisease"),
        path('ecgrequest',views.ecg,name="ecgrequest"),


]
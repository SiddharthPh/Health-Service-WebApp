from django.shortcuts import render
from accounts.models import Doctor,Patient
from .models import patient_profile, doctor_profile,Appointment,Medical_history
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from accounts.views import *

# Create your views here.
@login_required(login_url='loginp')
def patient_home(request):
    doctors=Doctor.objects.all()
    patient_name=request.session.get('patient_name')
    patient_email=request.session.get('patient_email')
    patient_address=request.session.get('patient_address')
    patient_phone=request.session.get('patient_phone')
    patient_height=request.session.get('patient_height')
    patient_weight=request.session.get('patient_weight')
    patient_gender=request.session.get('patient_gender')
    patient_obj=Patient.objects.all().get(email=patient_email)
    if Medical_history.objects.all().filter(patient_obj=patient_obj):
        medical_history_obj=Medical_history.objects.all().get(patient_obj=patient_obj)
    else:
        medical_history_obj=None
    context={
        'patient_name':patient_name,
        'patient_email':patient_email,
        'patient_address':patient_address,
        'patient_phone':patient_phone,
        'patient_height':patient_height,
        'patient_weight':patient_weight,
        'patient_gender':patient_gender,
        'doctors':doctors,
        'medical_history_obj':medical_history_obj,
    }
    return render(request,'main/patient_home.html',context)
def logout(request):
    messages.success(request,'Successfully, Loggedout')
    return redirect('home')
@login_required(login_url='logind')
def doctor_home(request):
    doctor_name=request.session.get('doctor_name')
    doctor_email=request.session.get('doctor_email')
    doctor_address=request.session.get('doctor_address')
    doctor_phone=request.session.get('doctor_phone')
    if Appointment.objects.all().filter(doctor_mail=doctor_email):
        appointment_obj=Appointment.objects.all().filter(doctor_mail=doctor_email)
    else:
        appointment_obj=None
    patient_obj=Patient.objects.all()
    medical_history_obj=Medical_history.objects.all()
    context={
        'doctor_name':doctor_name,
        'doctor_email':doctor_email,
        'doctor_address':doctor_address,
        'doctor_phone':doctor_phone,
        'appointment_obj':appointment_obj,
        'patient_obj':patient_obj,
        'medical_history_obj':medical_history_obj,
    }
    return render(request,'main/doctor_home.html',context)

def appointment(request):
    fullName=request.POST['fullName']
    email=request.POST['email']
    time=request.POST['schedule_time']
    date=request.POST['schedule_date']
    doctor=request.POST['doctors']
    message=request.POST['message']
    appointment=Appointment.objects.create(from_patient_name=fullName,from_patient_email=email,time=time,date=date,doctor_mail=doctor,message=message)
    return render(request,'main/appointment.html',{'fullName':fullName,'email':email,'time':time,'date':date, 'doctor':doctor,'message':message})
def medical_history_check(request):
    patient_email=request.POST['patient_email']
    patient_obj=Patient.objects.all().get(email=patient_email)
    drugallergies=request.POST['drugallergies']
    all_illness=request.POST['allillness']
    all_operations=request.POST['alloperations']
    current_medication=request.POST['current_medication']
    medical_history_obj=Medical_history.objects.create(patient_obj=patient_obj,drugallergies=drugallergies,all_illness=all_illness,all_operations=all_operations,current_medication=current_medication)
    return redirect('patient_home')
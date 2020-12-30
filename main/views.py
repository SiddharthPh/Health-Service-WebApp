from django.shortcuts import render
from .models import patient_profile
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from accounts.views import *

# Create your views here.
@login_required(login_url='loginp')
def patient_home(request):
    patient_name=request.session.get('patient_name')
    patient_email=request.session.get('patient_email')
    patient_address=request.session.get('patient_address')
    patient_phone=request.session.get('patient_phone')
    context={
        'patient_name':patient_name,
        'patient_email':patient_email,
        'patient_address':patient_address,
        'patient_phone':patient_phone
    }
    return render(request,'main/patient_home.html',context)
def logout(request):
    messages.success(request,'Successfully, Loggedout')
    return redirect('home')

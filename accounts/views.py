from django.shortcuts import render,redirect
from main.models import patient_profile, doctor_profile
from .models import *
from django.contrib import messages
from django.utils import timezone
from main.views import patient_home, doctor_home
import json
from django.core.serializers import serialize
from django.core.serializers.json import DjangoJSONEncoder


# Create your views here.
def home(request):
    return render(request,'accounts/home.html')
def loginp(request):
    return render(request,'accounts/loginp.html')
def logind(request):
    return render(request,'accounts/logind.html')
def loginph(request):
    return render(request,'accounts/loginph.html')
def signupp(request):
    return render(request,'accounts/signupp.html')
def signupd(request):
    return render(request,'accounts/signupd.html')
def signupph(request):
    return render(request,'accounts/signupph.html')
def signupp_check(request):
    if request.method=='POST':
        name=request.POST['name']
        phone=request.POST['phone']
        email=request.POST['email']
        address=request.POST['address']
        password=request.POST['password']
        height=request.POST['height']
        weight=request.POST['weight']
        gender=request.POST['gender']
        date=timezone.now()
        if Patient.objects.all().filter(email=email):
            messages.error(request,'Account already Created! Username Exists')
            return redirect('/loginp')
        else:
            patient=Patient.objects.create(name=name,phone=phone,email=email,address=address,password=password,height=height,weight=weight,gender=gender,date_created=date,date_updated=date)
            patient.save()
            patient_prof=patient_profile.objects.create(patient_user=patient)            
            patient_prof.save()
            messages.success(request,'Account created, Please login with the credentials')
            return redirect('/loginp')
def signupd_check(request):
    if request.method=='POST':
        name=request.POST['name']
        phone=request.POST['phone']
        email=request.POST['email']
        address=request.POST['address']
        password=request.POST['password']
        profession=request.POST['profession']
        date=timezone.now()
        if Doctor.objects.all().filter(email=email):
            messages.error(request,'Account already Created! Username Exists')
            return redirect('/logind')
        else:
            doctor=Doctor.objects.create(name=name,phone=phone,email=email,address=address,password=password,date_created=date,date_updated=date,profession=profession)
            doctor.save()
            doctor_profobj= doctor_profile.objects.create(doctor_user=doctor)
            doctor_profobj.save()
            messages.success(request,'Account created, Please login with the credentials')
            return redirect('/logind')
def signupph_check(request):
    if request.method=='POST':
        name=request.POST['name']
        phone=request.POST['phone']
        email=request.POST['email']
        address=request.POST['address']
        password=request.POST['password']
        date=timezone.now()
        if Physician.objects.all().filter(email=email):
            messages.error(request,'Account already Created! Username Exists')
            return redirect('/loginph')
        else:
            physician=Physician.objects.create(name=name,phone=phone,email=email,address=address,password=password,date_created=date,date_updated=date)
            physician.save()
            messages.success(request,'Account created, Please login with the credentials')
            return redirect('/loginph')
def loginp_check(request):
    if request.method=='POST':
        email=request.POST['email']
        password=request.POST['password']
        if Patient.objects.all().filter(email=email):
            if Patient.objects.all().filter(email=email,password=password):
                patient_obj=Patient.objects.all().get(email=email)
                patient_profile_obj=patient_profile.objects.all().get(patient_user=patient_obj)
                # current_patient=patient_profile_obj
                messages.error(request,'Success')
                # strdata=serialize('json',patient_profile.objects.all(),cls=LazyEncoder)
                # data=json.loads(strdata)
                request.session['patient_name']=patient_profile_obj.patient_user.name
                request.session['patient_email']=patient_profile_obj.patient_user.email
                request.session['patient_address']=patient_profile_obj.patient_user.address
                request.session['patient_phone']=patient_profile_obj.patient_user.phone
                request.session['patient_height']=patient_profile_obj.patient_user.height
                request.session['patient_weight']=patient_profile_obj.patient_user.weight
                request.session['patient_gender']=patient_profile_obj.patient_user.gender
                return redirect('patient_home')
            else:
                messages.error(request,'Invalid Password')
                return redirect('/loginp')
        else:
            messages.error(request,'Account not found')
            return redirect('/loginp')

class LazyEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, YourCustomType):
            return str(obj)
        return super().default(obj)

def logind_check(request):
    if request.method=='POST':
        email=request.POST['email']
        password=request.POST['password']
        if Doctor.objects.all().filter(email=email):
            if Doctor.objects.all().filter(email=email,password=password):
                doctor_obj=Doctor.objects.all().get(email=email)
                doctor_obj_profile=doctor_profile.objects.all().get(doctor_user=doctor_obj)
                request.session['doctor_name']=doctor_obj_profile.doctor_user.name
                request.session['doctor_email']=doctor_obj_profile.doctor_user.email
                request.session['doctor_address']=doctor_obj_profile.doctor_user.address
                request.session['doctor_phone']=doctor_obj_profile.doctor_user.phone
                request.session['doctor_profession']=doctor_obj_profile.doctor_user.profession
                
                messages.error(request,'Success')

                return redirect('doctor_home')
            else:
                messages.error(request,'Invalid Password')
                return redirect('d/logind')
        else:
            messages.error(request,'Account not found')
            return redirect('/logind')
def loginph_check(request):
    if request.method=='POST':
        email=request.POST['email']
        password=request.POST['password']
        if Physician.objects.all().filter(email=email):
            if Physician.objects.all().filter(email=email,password=password):
                messages.error(request,'Success')
                return redirect('/loginph')
            else:
                messages.error(request,'Invalid Password')
                return redirect('/loginph')
        else:
            messages.error(request,'Account not found')
            return redirect('/loginph')

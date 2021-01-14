from django.db import models
from accounts.models import *
# Create your models here.
class patient_profile(models.Model):
    patient_user=models.OneToOneField(Patient,on_delete=models.CASCADE)
    image=models.ImageField(default='patient_pics/default.png',upload_to='patient_pics')
    def __str__(self):
        return f'{self.patient_user.name} Profile'

class doctor_profile(models.Model):
    doctor_user=models.OneToOneField(Doctor,on_delete=models.CASCADE)
    image=models.ImageField(default='patient_pics/default.png',upload_to='patient_pics')
    def __str__(self):
        return f'{self.doctor_user.name} Profile'

class Appointment(models.Model):
    from_patient_name=models.CharField(max_length=300,null=True)
    from_patient_email=models.CharField(max_length=300,null=True)
    time=models.CharField(max_length=200,null=True)
    date=models.CharField(max_length=200,null=True)
    doctor_mail=models.EmailField(max_length=300,null=True)
    message=models.TextField(max_length=400,null=True)
    def __str__(self):
        return f'{self.from_patient_name} Profile'
class Medical_history(models.Model):
    patient_obj=models.OneToOneField(Patient,on_delete=models.CASCADE)
    drugallergies=models.TextField(max_length=300,default="None",null=True)
    all_illness=models.TextField(max_length=400,default="None",null=True)
    all_operations=models.TextField(max_length=400,default="None",null=True)
    current_medication=models.TextField(max_length=400,default="None",null=True)
    def __str__(self):
        return f'{self.patient_obj.email} Profile'
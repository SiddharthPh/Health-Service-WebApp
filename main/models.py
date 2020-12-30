from django.db import models
from accounts.models import *
# Create your models here.
class patient_profile(models.Model):
    patient_user=models.OneToOneField(Patient,on_delete=models.CASCADE)
    image=models.ImageField(default='patient_pics/default.png',upload_to='patient_pics')
    def __str__(self):
        return f'{self.patient_user.name} Profile'
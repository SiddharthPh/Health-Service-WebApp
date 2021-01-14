from django.db import models

# Create your models here.
# class profession(models.Model):

class Patient(models.Model):
    name=models.CharField(max_length=200,null=True)
    phone=models.CharField(max_length=200,null=True)
    email=models.EmailField(max_length=200,null=True)
    address=models.TextField(max_length=500,null=True)
    password=models.CharField(max_length=200,null=True)
    height=models.FloatField(max_length=300,null=True)
    weight=models.FloatField(max_length=300,null=True)
    gender=models.CharField(max_length=30,null=True)
    date_created=models.DateTimeField(auto_now_add=True)
    date_updated=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
class Doctor(models.Model):
    professions=(
        ('GH','General_Health'),
        ('CD','Cardiology'),
        ('D','Dental'),
        ('R','Research'),
    )
    name=models.CharField(max_length=200,null=True)
    phone=models.CharField(max_length=200,null=True)
    email=models.EmailField(max_length=200,null=True)
    address=models.TextField(max_length=500,null=True)
    password=models.CharField(max_length=200,null=True)
    date_created=models.DateTimeField(auto_now_add=True)
    date_updated=models.DateTimeField(auto_now=True)
    profession=models.CharField(max_length=3,choices=professions,null=True)

    def __str__(self):
        return self.name
class Physician(models.Model):
    name=models.CharField(max_length=200,null=True)
    phone=models.CharField(max_length=200,null=True)
    email=models.EmailField(max_length=200,null=True)
    address=models.TextField(max_length=500,null=True)
    password=models.CharField(max_length=200,null=True)
    date_created=models.DateTimeField(auto_now_add=True)
    date_updated=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
from django.shortcuts import render,redirect

# Create your views here.
def home(request):
    return render(request,'accounts/home.html')
def loginp(request):
    return render(request,'accounts/loginp.html')
def logind(request):
    return render(request,'accounts/logind.html')
def loginph(request):
    return render(request,'accounts/loginph.html')
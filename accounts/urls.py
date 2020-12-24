from django.urls import path
from . import views

urlpatterns = [
    path('',views.home, name="home"),
    path('loginp',views.loginp,name="loginp"),
    path('logind',views.logind,name="logind"),
    path('loginph',views.loginph,name="loginph"),
]
  
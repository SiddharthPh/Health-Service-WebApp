from django.urls import path
from . import views

urlpatterns = [
    path('',views.home, name="home"),
    path('loginp',views.loginp,name="loginp"),
    path('logind',views.logind,name="logind"),
    path('loginph',views.loginph,name="loginph"),
    path('signupp',views.signupp,name="signupp"),
    path('signupp_check',views.signupp_check,name="signupp_check"),
    path('signupd',views.signupd,name="signupd"),
    path('signupd_check',views.signupd_check,name="signupd_check"),
    path('signupph',views.signupph,name="signupph"),
    path('signupph_check',views.signupph_check,name="signupph_check"),
    
    path('loginp_check',views.loginp_check,name="loginp_check"),
    path('logind_check',views.logind_check,name="logind_check"),
    path('loginph_check',views.loginph_check,name="loginph_check"),
]
  
from django.urls import path
from users.api.views import  LoginView

urlpatterns = [
    path('api/auth/login', LoginView.as_view(), name='login'),
]
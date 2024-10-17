from django.urls import path
from django.views.generic import RedirectView
from .views import get_products,get_product,get_user_profile,MyTokenObtainPairView,get_users,register,ActivateAccountView

from rest_framework_simplejwt.views import (
    TokenObtainPairView
)

urlpatterns = [
    path('', RedirectView.as_view(url='products/', permanent=True)),
    path('products/', get_products, name='get_products'),
    path('products/<str:pk>/', get_product, name='get_product'),
    path('users/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile/', get_user_profile, name='get_user_profile'),
    path('users/', get_users, name='get_users'),
    path('users/register/', register, name='register'),
    path('activate/<uidb64>/<token>/', ActivateAccountView.as_view(), name='activate'),
    
]

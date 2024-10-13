from django.urls import path
from django.views.generic import RedirectView
from .views import get_products,get_product

urlpatterns = [
    path('', RedirectView.as_view(url='products/', permanent=True)),
    path('products/', get_products, name='get_products'),
    path('products/<str:pk>/', get_product, name='get_product'),
]

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .serializer import ProductSerializer,UserSerializer
from .models import Product

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from django.contrib.auth.models import User


# Create your views here.

@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products,many=True)
    return Response({'status':200,'products':serializer.data})

@api_view(['GET'])
def get_product(request,pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product,many=False)
    return Response({'status':200,'product':serializer.data})



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        if not user.is_active:
            raise serializers.ValidationError("User account is inactive.")
        data['username'] = user.username
        data['email'] = user.email

        return data
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    serializer = UserSerializer(user,many=False)
    return Response({'status':200,'user':serializer.data})
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_users(request):
    user = User.objects.all()
    serializer = UserSerializer(user,many=True)
    return Response({'status':200,'user':serializer.data})
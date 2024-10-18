from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .serializer import ProductSerializer,UserSerializer
from .models import Product

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status

#for sending mail generate token
from .utils import TokenGenerator,generate_token
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from django.utils.encoding import force_bytes,force_text,DjangoUnicodeDecodeError
from django.core.mail import EmailMessage
from django.conf import settings

from django.views.generic import View

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

@api_view(['POST'])
def register(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['fname'],
            last_name=data['lname'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password']),
            is_active=True
        )
        
        #Generate Token Sent a Email
        # email_subject = "Activate Your Account"
        # message = render_to_string(
        #     "activate.html",
        #     {
        #         "user":user,
        #         "domain":"127.0.0.1:8000",
        #         "uid": urlsafe_base64_encode(force_bytes(user.pk)),
        #         "token": generate_token.make_token(user)
        #     }
        # )
        # email_message = EmailMessage(email_subject,message,settings.EMAIL_HOST_USER,[data['email']])
        
        # email_message.send()
        
        serializer = UserSerializer(user,many=False)
        
        return Response(serializer.data)
    except Exception as e:
        message = {'details':'User is already exists.'}        
        return Response(message,status=status.HTTP_400_BAD_REQUEST)
    
    
class ActivateAccountView(View):
    def get(self,request,uidb64,token):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
            
        except Exception as identifier:
            user = None
            
        if user is not None and generate_token.check_token(user,token):
            user.is_active = True
            user.save()
            message = {'details':'Account is Activated.'}
            return render(request,"activatesuccess.html")
        else:
            return render(request,"activatefail.html")
            
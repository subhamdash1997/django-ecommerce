from rest_framework import serializers
from .models import Product
from django.contrib.auth.models import User


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'isAdmin']
    
    def get_name(self, obj):
        firstname = obj.first_name
        lastname = obj.last_name
        name = f"{firstname} {lastname}".strip()
        return name if name else obj.email
    
    def get_isAdmin(self, obj):
        return obj.is_staff

    def validate_email(self, value):
        # Example of custom email validation
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate_username(self, value):
        # Example of custom username validation
        if not value.isalnum():
            raise serializers.ValidationError("Username should only contain alphanumeric characters.")
        return value
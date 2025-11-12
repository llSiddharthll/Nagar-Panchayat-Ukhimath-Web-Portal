from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import *
from django.contrib.auth import authenticate


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if user.is_active:
                    data['user'] = user
                else:
                    raise serializers.ValidationError('User account is disabled.')
            else:
                raise serializers.ValidationError('Unable to log in with provided credentials.')
        else:
            raise serializers.ValidationError('Must include "username" and "password".')

        return data

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['username', 'email', 'full_name', 'password', 'confirm_password']

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords don't match")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            full_name=validated_data.get('full_name', '')
        )
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'username', 'email', 'full_name', 'is_active', 'is_staff', 'is_superuser']
        read_only_fields = ['user_id', 'is_active', 'is_staff', 'is_superuser']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'username', 'password', 'full_name', 'email', 'is_active', 'is_staff', 'is_superuser']
        read_only_fields = ['user_id']
        extra_kwargs = {
            'password': {'write_only': True, 'required': False}
        }
    
    def create(self, validated_data):
        # Password is required for creation
        if 'password' not in validated_data:
            raise serializers.ValidationError({"password": "This field is required when creating a user."})
        
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        # If password is provided, hash it
        if 'password' in validated_data and validated_data['password']:
            validated_data['password'] = make_password(validated_data['password'])
        else:
            # If password is not provided, remove it from validated_data
            # so the existing password is preserved
            validated_data.pop('password', None)
        
        return super().update(instance, validated_data)
    
    def update(self, instance, validated_data):
        # Get the requesting user from context
        request = self.context.get('request')
        
        # If password is provided, hash it
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        else:
            # If password is not provided and user is superuser, remove it from validated_data
            # so the existing password is preserved
            if request and request.user.is_superuser:
                validated_data.pop('password', None)
            else:
                # For non-superusers, require password for updates
                raise serializers.ValidationError({"password": "This field is required."})
        
        return super().update(instance, validated_data)

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['role_id', 'role_name']

class UserRolesSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    role = RoleSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)
    role_id = serializers.PrimaryKeyRelatedField(queryset=Role.objects.all(), write_only=True)
    
    class Meta:
        model = UserRoles
        fields = ['id', 'user', 'role', 'user_id', 'role_id']
    
    def create(self, validated_data):
        user = validated_data.pop('user_id')
        role = validated_data.pop('role_id')
        return UserRoles.objects.create(user=user, role=role)

class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ['permission_id', 'permission_name']

class RolePermissionsSerializer(serializers.ModelSerializer):
    role = RoleSerializer(read_only=True)
    permission = PermissionSerializer(read_only=True)
    role_id = serializers.PrimaryKeyRelatedField(queryset=Role.objects.all(), write_only=True)
    permission_id = serializers.PrimaryKeyRelatedField(queryset=Permission.objects.all(), write_only=True)
    
    class Meta:
        model = RolePermissions
        fields = ['id', 'role', 'permission', 'role_id', 'permission_id']
    
    def create(self, validated_data):
        role = validated_data.pop('role_id')
        permission = validated_data.pop('permission_id')
        return RolePermissions.objects.create(role=role, permission=permission)

class NoticeSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    
    class Meta:
        model = Notice
        fields = '__all__'

class TenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tender
        fields = '__all__'

class NewsAndEventsSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    
    class Meta:
        model = NewsAndEvents
        fields = '__all__'

class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = '__all__'

class DocumentsSerializer(serializers.ModelSerializer):
    uploaded_by = UserSerializer(read_only=True)
    
    class Meta:
        model = Documents
        fields = '__all__'

class SchemesAndProjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchemesAndProjects
        fields = '__all__'

class FeedbackSerializer(serializers.ModelSerializer):
    citizen_user = UserSerializer(read_only=True)
    
    class Meta:
        model = Feedback
        fields = '__all__'

class HelpLineQueriesSerializer(serializers.ModelSerializer):
    assigned_to = UserSerializer(read_only=True)
    
    class Meta:
        model = HelpLineQueries
        fields = '__all__'
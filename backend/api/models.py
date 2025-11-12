from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import MinValueValidator
from decimal import Decimal

class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, full_name=None):
        if not username:
            raise ValueError('Users must have a username')
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            username=username,
            email=self.normalize_email(email),
            full_name=full_name,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, full_name=None):
        user = self.create_user(
            username=username,
            email=email,
            password=password,
            full_name=full_name,
        )
        user.is_active = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True, null=False)
    password_hash = models.CharField(max_length=255, blank=True)  # Will store hashed password
    full_name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # Required for admin
    is_superuser = models.BooleanField(default=False)  # Required for admin
    
    # Remove groups and user_permissions from fields if they cause issues
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to.',
        related_name="cms_user_set",
        related_query_name="user",
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name="cms_user_set",
        related_query_name="user",
    )
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
    
    objects = UserManager()
    
    def __str__(self):
        return self.username
    
    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser

class Role(models.Model):
    role_id = models.AutoField(primary_key=True)
    role_name = models.CharField(max_length=50, unique=True, null=False)
    
    def __str__(self):
        return self.role_name

class UserRoles(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ('user', 'role')
    
    def __str__(self):
        return f"{self.user.username} - {self.role.role_name}"

class Permission(models.Model):
    permission_id = models.AutoField(primary_key=True)
    permission_name = models.CharField(max_length=50, unique=True, null=False)
    
    def __str__(self):
        return self.permission_name

class RolePermissions(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ('role', 'permission')
    
    def __str__(self):
        return f"{self.role.role_name} - {self.permission.permission_name}"

class Notice(models.Model):
    STATUS_CHOICES = [
        ('Draft', 'Draft'),
        ('Published', 'Published'),
        ('Archived', 'Archived'),
    ]
    
    notice_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, null=False)
    content = models.TextField(blank=True, null=True)
    publish_date = models.DateTimeField(null=False)
    expiry_date = models.DateTimeField(blank=True, null=True)
    document_file_path = models.CharField(max_length=255, blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notices')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Draft')
    
    def __str__(self):
        return self.title

class Tender(models.Model):
    tender_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, null=False)
    description = models.TextField(blank=True, null=True)
    tender_document_path = models.CharField(max_length=255, null=False)
    submission_deadline = models.DateTimeField(null=False)
    opening_date = models.DateTimeField(blank=True, null=True)
    
    def __str__(self):
        return self.title

class NewsAndEvents(models.Model):
    TYPE_CHOICES = [
        ('News', 'News'),
        ('Event', 'Event'),
        ('Announcement', 'Announcement'),
    ]
    
    news_event_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, null=False)
    body = models.TextField(blank=True, null=True)
    event_date = models.DateField(blank=True, null=True)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, null=False)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='news_events')
    
    def __str__(self):
        return self.title

class Gallery(models.Model):
    TYPE_CHOICES = [
        ('Photo', 'Photo'),
        ('Video', 'Video'),
    ]
    
    media_id = models.AutoField(primary_key=True)
    caption = models.CharField(max_length=255, blank=True, null=True)
    file_path = models.CharField(max_length=255, null=False)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, null=False)
    upload_date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.caption or f"Media {self.media_id}"

class Documents(models.Model):
    doc_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, null=False)
    category = models.CharField(max_length=100, blank=True, null=True)
    file_path = models.CharField(max_length=255, null=False)
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='documents')
    
    def __str__(self):
        return self.title

class SchemesAndProjects(models.Model):
    TYPE_CHOICES = [
        ('Scheme', 'Scheme'),
        ('Project', 'Project'),
    ]
    
    sp_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=False)
    description = models.TextField(blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    budget = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True, validators=[MinValueValidator(Decimal('0.00'))])
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, null=False)
    
    def __str__(self):
        return self.name

class Feedback(models.Model):
    STATUS_CHOICES = [
        ('New', 'New'),
        ('In Progress', 'In Progress'),
        ('Resolved', 'Resolved'),
        ('Closed', 'Closed'),
    ]
    
    feedback_id = models.AutoField(primary_key=True)
    subject = models.CharField(max_length=255, null=False)
    message = models.TextField(null=False)
    citizen_user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True, related_name='feedback')
    citizen_name = models.CharField(max_length=100, blank=True, null=True)
    citizen_email = models.EmailField(max_length=100, blank=True, null=True)
    submitted_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='New')
    
    def __str__(self):
        return self.subject

class HelpLineQueries(models.Model):
    query_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    details = models.TextField(null=False)
    contact_number = models.CharField(max_length=15, null=False)
    query_date = models.DateTimeField(auto_now_add=True)
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True, related_name='assigned_queries')
    
    def __str__(self):
        return self.title or f"Query {self.query_id}"
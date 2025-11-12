from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['username', 'email', 'full_name', 'is_active', 'is_staff']
    list_filter = ['is_active', 'is_staff', 'is_superuser']
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal Info', {'fields': ('full_name', 'email')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'full_name', 'is_active', 'is_staff', 'is_superuser'),
        }),
    )
    search_fields = ['username', 'email', 'full_name']
    ordering = ['username']

admin.site.register(User, CustomUserAdmin)
admin.site.register(Role)
admin.site.register(UserRoles)
admin.site.register(Permission)
admin.site.register(RolePermissions)
admin.site.register(Notice)
admin.site.register(Tender)
admin.site.register(NewsAndEvents)
admin.site.register(Gallery)
admin.site.register(Documents)
admin.site.register(SchemesAndProjects)
admin.site.register(Feedback)
admin.site.register(HelpLineQueries)
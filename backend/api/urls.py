from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'roles', views.RoleViewSet)
router.register(r'user-roles', views.UserRolesViewSet)
router.register(r'permissions', views.PermissionViewSet)
router.register(r'role-permissions', views.RolePermissionsViewSet)
router.register(r'notices', views.NoticeViewSet)
router.register(r'tenders', views.TenderViewSet)
router.register(r'news-events', views.NewsAndEventsViewSet)
router.register(r'gallery', views.GalleryViewSet)
router.register(r'documents', views.DocumentsViewSet)
router.register(r'schemes-projects', views.SchemesAndProjectsViewSet)
router.register(r'feedback', views.FeedbackViewSet)
router.register(r'helpline-queries', views.HelpLineQueriesViewSet)
router.register(r'auth', views.AuthViewSet, basename='auth')

urlpatterns = [
    path('', include(router.urls)),
]
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  User,
  Role,
  UserRole,
  Permission,
  RolePermission,
  Notice,
  Tender,
  NewsEvent,
  GalleryItem,
  Document,
  SchemeProject,
  Feedback,
  HelplineQuery,
  LoginCredentials,
  AuthResponse
} from '@/types';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Enhanced request interceptor
api.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('adminToken');
    
    // If adminToken doesn't exist, try other common names
    if (!token) {
      token = localStorage.getItem('token') || 
               localStorage.getItem('access_token') ||
               localStorage.getItem('authToken');
    }

    if (token) {
      // Clean the token (remove quotes if present)
      token = token.replace(/^"(.*)"$/, '$1');
      
      // Try different authorization headers
      if (token.startsWith('Bearer ')) {
        config.headers.Authorization = token;
      } else {
        // Try both common formats
        config.headers.Authorization = `Bearer ${token}`;
        // Also set as Token for Django REST framework TokenAuthentication
        config.headers['Authorization'] = `Token ${token}`;
      }
    }
    
    console.log('Request Headers:', config.headers); // Debug log
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Enhanced response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('API Error:', error.response); // Debug log
    
    if (error.response?.status === 401) {
      // Clear all possible auth items
      localStorage.removeItem('adminToken');
      localStorage.removeItem('token');
      localStorage.removeItem('access_token');
      localStorage.removeItem('authToken');
      localStorage.removeItem('adminUser');
      
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials: LoginCredentials): Promise<AxiosResponse<AuthResponse>> => 
    api.post('/auth/login/', credentials),
  register: (userData: any): Promise<AxiosResponse<AuthResponse>> => 
    api.post('/auth/register/', userData),
  logout: (): Promise<AxiosResponse> => api.post('/auth/logout/'),
  getProfile: (): Promise<AxiosResponse<User>> => api.get('/auth/profile/'),
  checkAuth: (): Promise<AxiosResponse<{ is_authenticated: boolean; user?: User }>> => 
    api.get('/auth/check_auth/'),
};

export const usersAPI = {
  getAll: (): Promise<AxiosResponse<User[]>> => api.get('/users/'),
  getById: (id: number): Promise<AxiosResponse<User>> => api.get(`/users/${id}/`),
  create: (data: Partial<User>): Promise<AxiosResponse<User>> => api.post('/users/', data),
  update: (id: number, data: Partial<User>): Promise<AxiosResponse<User>> => api.put(`/users/${id}/`, data),
  delete: (id: number): Promise<AxiosResponse> => api.delete(`/users/${id}/`),
};

export const rolesAPI = {
  getAll: (): Promise<AxiosResponse<Role[]>> => api.get('/roles/'),
  getById: (id: number): Promise<AxiosResponse<Role>> => api.get(`/roles/${id}/`),
  create: (data: Partial<Role>): Promise<AxiosResponse<Role>> => api.post('/roles/', data),
  update: (id: number, data: Partial<Role>): Promise<AxiosResponse<Role>> => api.put(`/roles/${id}/`, data),
  delete: (id: number): Promise<AxiosResponse> => api.delete(`/roles/${id}/`),
};

export const userRolesAPI = {
  getAll: (): Promise<AxiosResponse<UserRole[]>> => api.get('/user-roles/'),
  create: (data: UserRole): Promise<AxiosResponse<UserRole>> => api.post('/user-roles/', data),
  delete: (userId: number, roleId: number): Promise<AxiosResponse> => 
    api.delete(`/user-roles/?user=${userId}&role=${roleId}`),
};

export const permissionsAPI = {
  getAll: (): Promise<AxiosResponse<Permission[]>> => api.get('/permissions/'),
};

export const rolePermissionsAPI = {
  getAll: (): Promise<AxiosResponse<RolePermission[]>> => api.get('/role-permissions/'),
  create: (data: RolePermission): Promise<AxiosResponse<RolePermission>> => api.post('/role-permissions/', data),
  delete: (roleId: number, permissionId: number): Promise<AxiosResponse> => 
    api.delete(`/role-permissions/?role=${roleId}&permission=${permissionId}`),
};

export const noticesAPI = {
  getAll: (): Promise<AxiosResponse<Notice[]>> => api.get('/notices/'),
  getById: (id: number): Promise<AxiosResponse<Notice>> => api.get(`/notices/${id}/`),
  create: (data: Partial<Notice>): Promise<AxiosResponse<Notice>> => api.post('/notices/', data),
  update: (id: number, data: Partial<Notice>): Promise<AxiosResponse<Notice>> => api.put(`/notices/${id}/`, data),
  delete: (id: number): Promise<AxiosResponse> => api.delete(`/notices/${id}/`),
};

export const tendersAPI = {
  getAll: (): Promise<AxiosResponse<Tender[]>> => api.get('/tenders/'),
  getById: (id: number): Promise<AxiosResponse<Tender>> => api.get(`/tenders/${id}/`),
  create: (data: Partial<Tender>): Promise<AxiosResponse<Tender>> => api.post('/tenders/', data),
  update: (id: number, data: Partial<Tender>): Promise<AxiosResponse<Tender>> => api.put(`/tenders/${id}/`, data),
  delete: (id: number): Promise<AxiosResponse> => api.delete(`/tenders/${id}/`),
};

export const newsEventsAPI = {
  getAll: (): Promise<AxiosResponse<NewsEvent[]>> => api.get('/news-events/'),
  getById: (id: number): Promise<AxiosResponse<NewsEvent>> => api.get(`/news-events/${id}/`),
  create: (data: Partial<NewsEvent>): Promise<AxiosResponse<NewsEvent>> => api.post('/news-events/', data),
  update: (id: number, data: Partial<NewsEvent>): Promise<AxiosResponse<NewsEvent>> => api.put(`/news-events/${id}/`, data),
  delete: (id: number): Promise<AxiosResponse> => api.delete(`/news-events/${id}/`),
};

export const galleryAPI = {
  getAll: (): Promise<AxiosResponse<GalleryItem[]>> => api.get('/gallery/'),
  getById: (id: number): Promise<AxiosResponse<GalleryItem>> => api.get(`/gallery/${id}/`),
  create: (data: Partial<GalleryItem>): Promise<AxiosResponse<GalleryItem>> => api.post('/gallery/', data),
  update: (id: number, data: Partial<GalleryItem>): Promise<AxiosResponse<GalleryItem>> => api.put(`/gallery/${id}/`, data),
  delete: (id: number): Promise<AxiosResponse> => api.delete(`/gallery/${id}/`),
};

export const documentsAPI = {
  getAll: (): Promise<AxiosResponse<Document[]>> => api.get('/documents/'),
  getById: (id: number): Promise<AxiosResponse<Document>> => api.get(`/documents/${id}/`),
  create: (data: Partial<Document>): Promise<AxiosResponse<Document>> => api.post('/documents/', data),
  update: (id: number, data: Partial<Document>): Promise<AxiosResponse<Document>> => api.put(`/documents/${id}/`, data),
  delete: (id: number): Promise<AxiosResponse> => api.delete(`/documents/${id}/`),
};

export const schemesProjectsAPI = {
  getAll: (): Promise<AxiosResponse<SchemeProject[]>> => api.get('/schemes-projects/'),
  getById: (id: number): Promise<AxiosResponse<SchemeProject>> => api.get(`/schemes-projects/${id}/`),
  create: (data: Partial<SchemeProject>): Promise<AxiosResponse<SchemeProject>> => api.post('/schemes-projects/', data),
  update: (id: number, data: Partial<SchemeProject>): Promise<AxiosResponse<SchemeProject>> => api.put(`/schemes-projects/${id}/`, data),
  delete: (id: number): Promise<AxiosResponse> => api.delete(`/schemes-projects/${id}/`),
};

export const feedbackAPI = {
  getAll: (): Promise<AxiosResponse<Feedback[]>> => api.get('/feedback/'),
  getById: (id: number): Promise<AxiosResponse<Feedback>> => api.get(`/feedback/${id}/`),
  update: (id: number, data: Partial<Feedback>): Promise<AxiosResponse<Feedback>> => api.put(`/feedback/${id}/`, data),
  delete: (id: number): Promise<AxiosResponse> => api.delete(`/feedback/${id}/`),
};

export const helplineQueriesAPI = {
  getAll: (): Promise<AxiosResponse<HelplineQuery[]>> => api.get('/helpline-queries/'),
  getById: (id: number): Promise<AxiosResponse<HelplineQuery>> => api.get(`/helpline-queries/${id}/`),
  update: (id: number, data: Partial<HelplineQuery>): Promise<AxiosResponse<HelplineQuery>> => api.put(`/helpline-queries/${id}/`, data),
  delete: (id: number): Promise<AxiosResponse> => api.delete(`/helpline-queries/${id}/`),
};

export default api;
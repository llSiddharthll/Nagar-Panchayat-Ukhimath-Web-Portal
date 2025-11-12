export interface User {
  user_id: number;
  username: string;
  password_hash?: string;
  full_name?: string;
  email: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  groups?: any[];
  user_permissions?: any[];
}

export interface Role {
  role_id: number;
  role_name: string;
}

export interface UserRole {
  user: number;
  role: number;
}

export interface Permission {
  permission_id: number;
  permission_name: string;
}

export interface RolePermission {
  role: number;
  permission: number;
}

export interface Notice {
  notice_id: number;
  title: string;
  content?: string;
  publish_date: string;
  expiry_date?: string;
  document_file_path?: string;
  created_by: number;
  status: 'Draft' | 'Published' | 'Archived';
}

export interface Tender {
  tender_id: number;
  title: string;
  description?: string;
  tender_document_path: string;
  submission_deadline: string;
  opening_date?: string;
}

export interface NewsEvent {
  news_event_id: number;
  title: string;
  body?: string;
  event_date?: string;
  type: 'News' | 'Event' | 'Announcement';
  created_by: number;
}

export interface GalleryItem {
  media_id: number;
  caption?: string;
  file_path: string;
  type: 'Photo' | 'Video';
  upload_date: string;
}

export interface Document {
  doc_id: number;
  title: string;
  category?: string;
  file_path: string;
  uploaded_by: number;
}

export interface SchemeProject {
  sp_id: number;
  name: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  budget?: string;
  type: 'Scheme' | 'Project';
}

export interface Feedback {
  feedback_id: number;
  subject: string;
  message: string;
  citizen_user?: number;
  citizen_name?: string;
  citizen_email?: string;
  submitted_date: string;
  status: 'New' | 'In Progress' | 'Resolved' | 'Closed';
}

export interface HelplineQuery {
  query_id: number;
  title?: string;
  details: string;
  contact_number: string;
  query_date: string;
  assigned_to?: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}
"use client";
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, loading, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

    // Only redirect if NOT loading and NOT authenticated/authorized
useEffect(() => {
  console.log('Admin Layout - Auth State:', { loading, isAuthenticated, isAdmin });

  // Only redirect if auth check finished (loading === false) and user is not authenticated/authorized
  if (loading === false) {
    if (!isAuthenticated) {
      console.log('Redirecting to login...');
      router.push('/admin/login');
    }
  }
}, [loading, isAuthenticated, isAdmin, router]);

  // Show loading while checking authentication
  if (loading) {
    return <LoadingSpinner />;
  }

  // Only render the admin layout if user is authenticated AND is admin
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
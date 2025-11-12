"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaTachometerAlt,
  FaUsers,
  FaUserShield,
  FaBullhorn,
  FaGavel,
  FaNewspaper,
  FaImages,
  FaFileAlt,
  FaProjectDiagram,
  FaComments,
  FaHeadset,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { IconType } from 'react-icons';

interface MenuItem {
  path: string;
  icon: IconType;
  label: string;
}

const menuItems: MenuItem[] = [
  { path: '/admin', icon: FaTachometerAlt, label: 'Dashboard' },
  { path: '/admin/users', icon: FaUsers, label: 'Users' },
  { path: '/admin/roles', icon: FaUserShield, label: 'Roles & Permissions' },
  { path: '/admin/notices', icon: FaBullhorn, label: 'Notices' },
  { path: '/admin/tenders', icon: FaGavel, label: 'Tenders' },
  { path: '/admin/news-events', icon: FaNewspaper, label: 'News & Events' },
  { path: '/admin/gallery', icon: FaImages, label: 'Gallery' },
  { path: '/admin/documents', icon: FaFileAlt, label: 'Documents' },
  { path: '/admin/schemes-projects', icon: FaProjectDiagram, label: 'Schemes & Projects' },
  { path: '/admin/feedback', icon: FaComments, label: 'Feedback' },
  { path: '/admin/helpline-queries', icon: FaHeadset, label: 'Helpline Queries' },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const toggleSidebar = (): void => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-blue-800 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:transition-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between lg:justify-center h-16 px-4 border-b border-blue-700">
          <h1 className="text-xl font-bold">Ukhimath Admin</h1>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-1 rounded-md hover:bg-blue-700"
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-2">
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-blue-700 text-white shadow-lg'
                        : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
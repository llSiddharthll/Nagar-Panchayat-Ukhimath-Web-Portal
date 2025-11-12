"use client";
import { useAuth } from '@/contexts/AuthContext';
import { FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';

export default function AdminHeader() {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back, {user?.full_name || user?.username}
          </h1>
          <p className="text-gray-600 text-sm">
            Nagar Panchayat Ukhimath Administration Panel
          </p>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-3 bg-gray-50 hover:bg-gray-100 rounded-lg px-4 py-2 transition-colors duration-200 border border-gray-200"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <FaUser className="text-white text-sm" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-800">
                {user?.full_name || user?.username}
              </p>
              <p className="text-xs text-gray-600">
                {user?.is_superuser ? 'Super Admin' : 'Admin'}
              </p>
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <FaUser className="w-4 h-4 mr-3" />
                Profile
              </button>
              <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <FaCog className="w-4 h-4 mr-3" />
                Settings
              </button>
              <hr className="my-1" />
              <button
                onClick={logout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <FaSignOutAlt className="w-4 h-4 mr-3" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
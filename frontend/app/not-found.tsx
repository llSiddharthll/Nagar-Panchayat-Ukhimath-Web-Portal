'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Home, 
  ArrowLeft, 
  FileSearch, 
  Shield,
  Mail,
  Phone,
  Building2,
  MapPin
} from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-2xl w-full text-center">
        {/* Government Header */}
        <div className="mb-8">
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Panchayat Citizen Portal
          </h1>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-200 p-8 sm:p-12 mb-8">
          {/* Error Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
              <FileSearch className="w-10 h-10 text-red-600" />
            </div>
          </div>

          {/* Error Code */}
          <div className="mb-4">
            <span className="text-6xl font-bold text-gray-900">404</span>
          </div>

          {/* Error Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>

          {/* Error Description */}
          <div className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            <p className="mb-3">
              The page you are looking for doesn't exist or has been moved to a different location.
            </p>
            <p>
              This could be due to an outdated link, a typing error, or the page may have been removed during recent updates.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
            
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              <Home className="w-5 h-5 mr-2" />
              Return Home
            </Link>
          </div>

          {/* Quick Links */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
              Popular Services
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Link
                href="/forms-applications"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                Forms & Applications
              </Link>
              <Link
                href="/downloads"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                Downloads
              </Link>
              <Link
                href="/services"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                Online Services
              </Link>
              <Link
                href="/contact"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-200 p-6 mb-8">
          <div className="flex items-start">
            <Shield className="w-6 h-6 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 mb-2">Need Assistance?</h3>
              <p className="text-gray-600 text-sm mb-3">
                If you believe this is an error or need help finding specific information, 
                our support team is here to assist you.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>Helpline: 1800-XXX-XXXX</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>support@panchayat.gov.in</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Visit your local Panchayat office</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Panchayat Citizen Portal. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Secure & Official Government Platform
          </p>
        </div>
      </div>
    </div>
  );
}
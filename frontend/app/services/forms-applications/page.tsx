'use client';

import React,{ useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FileText, 
  Download, 
  Edit3, 
  Lock, 
  Search, 
  Filter,
  Building2,
  Users,
  Droplets,
  Store,
  HeartHandshake,
  MessageSquare,
  Home,
  FileQuestion,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  Shield,
  UserCheck
} from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

interface Form {
  id: number;
  title: string;
  category: string;
  description: string;
  file_path: string;
  is_online_form: boolean;
  last_updated: string;
  estimated_time: string;
  requirements: string[];
}

export default function FormsApplications() {
  const [forms, setForms] = useState<Form[]>([]);
  const [filteredForms, setFilteredForms] = useState<Form[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const router = useRouter();

  const categories = [
    'All',
    'Birth & Death',
    'Building & Construction',
    'Water & Sanitation',
    'Trade & Business',
    'Welfare Schemes',
    'Grievance & Feedback',
    'Household Services',
    'Other'
  ];

  const categoryIcons = {
    'Birth & Death': <Users className="w-5 h-5" />,
    'Building & Construction': <Building2 className="w-5 h-5" />,
    'Water & Sanitation': <Droplets className="w-5 h-5" />,
    'Trade & Business': <Store className="w-5 h-5" />,
    'Welfare Schemes': <HeartHandshake className="w-5 h-5" />,
    'Grievance & Feedback': <MessageSquare className="w-5 h-5" />,
    'Household Services': <Home className="w-5 h-5" />,
    'Other': <FileQuestion className="w-5 h-5" />
  };

  useEffect(() => {
    checkAuth();
    fetchForms();
  }, []);

  useEffect(() => {
    filterAndSortForms();
  }, [forms, searchTerm, selectedCategory, sortBy]);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (token && user) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  const fetchForms = async () => {
    try {
      // Mock data - replace with actual API call
      const mockForms: Form[] = [
        {
          id: 1,
          title: 'Birth Certificate Application',
          category: 'Birth & Death',
          description: 'Apply for a new birth certificate registration. Required for all births within Panchayat jurisdiction.',
          file_path: '/forms/birth-certificate.pdf',
          is_online_form: true,
          last_updated: '2024-01-15',
          estimated_time: '3-5 working days',
          requirements: ['Hospital birth record', 'Parent ID proof', 'Address proof']
        },
        {
          id: 2,
          title: 'Building Plan Approval',
          category: 'Building & Construction',
          description: 'Submit building construction plans for official approval and compliance verification.',
          file_path: '/forms/building-approval.pdf',
          is_online_form: false,
          last_updated: '2024-01-10',
          estimated_time: '7-10 working days',
          requirements: ['Architect signed plans', 'Land ownership documents', 'Structural stability certificate']
        },
        {
          id: 3,
          title: 'New Water Connection',
          category: 'Water & Sanitation',
          description: 'Apply for new residential or commercial water connection with metered supply.',
          file_path: '/forms/water-connection.pdf',
          is_online_form: true,
          last_updated: '2024-01-08',
          estimated_time: '5-7 working days',
          requirements: ['Property tax receipt', 'Address proof', 'Identity proof']
        },
        {
          id: 4,
          title: 'Trade License Application',
          category: 'Trade & Business',
          description: 'Register your business and obtain official trade license for commercial activities.',
          file_path: '/forms/trade-license.pdf',
          is_online_form: true,
          last_updated: '2024-01-12',
          estimated_time: '5 working days',
          requirements: ['Business address proof', 'Owner ID proof', 'Property ownership/rental agreement']
        },
        {
          id: 5,
          title: 'Old Age Pension Scheme',
          category: 'Welfare Schemes',
          description: 'Apply for government old age pension scheme for eligible senior citizens.',
          file_path: '/forms/pension-scheme.pdf',
          is_online_form: false,
          last_updated: '2024-01-05',
          estimated_time: '15 working days',
          requirements: ['Age proof', 'Income certificate', 'Bank account details', 'Residence proof']
        },
        {
          id: 6,
          title: 'Public Grievance Form',
          category: 'Grievance & Feedback',
          description: 'Submit complaints or suggestions for improving Panchayat services and infrastructure.',
          file_path: '/forms/grievance-form.pdf',
          is_online_form: true,
          last_updated: '2024-01-18',
          estimated_time: '2 working days',
          requirements: ['Contact information', 'Detailed description', 'Supporting documents if any']
        }
      ];
      
      setForms(mockForms);
    } catch (error) {
      console.error('Failed to fetch forms:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortForms = () => {
    let filtered = forms;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(form =>
        form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(form => form.category === selectedCategory);
    }

    // Sort forms
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'recent':
          return new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime();
        default:
          return 0;
      }
    });

    setFilteredForms(filtered);
  };

  const handleDownload = async (formId: number, fileName: string) => {
    if (!isAuthenticated) {
      router.push('/login?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }

    try {
      // Simulate download
      const link = document.createElement('a');
      link.href = '#';
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success message
      alert('Download started successfully');
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  const handleOnlineForm = (formId: number) => {
    if (!isAuthenticated) {
      router.push('/login?redirect=' + encodeURIComponent(`/forms/${formId}/fill`));
      return;
    }
    router.push(`/forms/${formId}/fill`);
  };

  const getCategoryCount = (category: string) => {
    if (category === 'All') return forms.length;
    return forms.filter(form => form.category === category).length;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-blue-700">Loading forms and applications...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Header />
      {/* Header Section */}
      <div className="bg-white border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Forms & Applications
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Access official government forms and applications for various Panchayat services. 
              Submit online or download forms for offline submission.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Authentication Banner */}
        {!isAuthenticated && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <Lock className="w-6 h-6 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-amber-800 mb-1">
                  Authentication Required
                </h3>
                <p className="text-amber-700">
                  Please{' '}
                  <Link 
                    href="/login" 
                    className="text-blue-600 hover:text-blue-800 underline font-medium"
                  >
                    login to your account
                  </Link>{' '}
                  to download forms or submit online applications. This ensures the security and integrity of all official documents.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-6 text-center">
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{forms.length}</div>
            <div className="text-sm text-gray-600">Total Forms</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-6 text-center">
            <Edit3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {forms.filter(f => f.is_online_form).length}
            </div>
            <div className="text-sm text-gray-600">Online Submission</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-6 text-center">
            <Download className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {forms.filter(f => !f.is_online_form).length}
            </div>
            <div className="text-sm text-gray-600">Download Only</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-6 text-center">
            <Shield className="w-8 h-8 text-amber-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">100%</div>
            <div className="text-sm text-gray-600">Secure & Verified</div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search forms by title, description, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex-1">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category} ({getCategoryCount(category)})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sort Options */}
            <div className="w-full lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="name">Sort by Name</option>
                <option value="category">Sort by Category</option>
                <option value="recent">Sort by Recent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Forms Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Available Forms ({filteredForms.length})
            </h2>
            <div className="text-sm text-gray-500">
              Showing {filteredForms.length} of {forms.length} forms
            </div>
          </div>

          {filteredForms.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-blue-100">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No forms found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {searchTerm ? 'Try adjusting your search terms or filters' : 'No forms are currently available in this category'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredForms.map((form) => (
                <div
                  key={form.id}
                  className="bg-white rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                          {categoryIcons[form.category as keyof typeof categoryIcons] || <FileText className="w-5 h-5 text-blue-600" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {form.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                              {form.category}
                            </span>
                            {form.is_online_form && (
                              <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full font-medium flex items-center">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Online Available
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {form.description}
                    </p>

                    {/* Requirements */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Required Documents:</h4>
                      <div className="flex flex-wrap gap-1">
                        {form.requirements.slice(0, 3).map((req, index) => (
                          <span
                            key={index}
                            className="bg-gray-50 text-gray-700 text-xs px-2 py-1 rounded"
                          >
                            {req}
                          </span>
                        ))}
                        {form.requirements.length > 3 && (
                          <span className="bg-gray-50 text-gray-500 text-xs px-2 py-1 rounded">
                            +{form.requirements.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {form.estimated_time}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Updated {new Date(form.last_updated).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        {form.is_online_form ? (
                          <button
                            onClick={() => handleOnlineForm(form.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 group"
                          >
                            <Edit3 className="w-4 h-4" />
                            Fill Online
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleDownload(form.id, `${form.title}.pdf`)}
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            Download PDF
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Service Categories Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Service Categories
            </h2>
            <p className="text-gray-600">
              Browse forms by service category to quickly find what you need
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.filter(cat => cat !== 'All').map((category) => {
              const count = forms.filter(form => form.category === category).length;
              const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || FileText;
              
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    selectedCategory === category 
                      ? 'border-blue-500 bg-blue-50 shadow-sm' 
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-2 rounded-lg ${
                      selectedCategory === category ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <div className={`w-4 h-4 ${
                        selectedCategory === category ? 'text-blue-600' : 'text-gray-600'
                      }`}>
                        {IconComponent}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {category}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{count}</div>
                  <div className="text-xs text-gray-500">forms available</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start space-x-4">
            <AlertCircle className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
              <p className="text-blue-800 mb-3">
                If you encounter any issues while accessing or submitting forms, please contact our support team.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center text-blue-700">
                  <UserCheck className="w-4 h-4 mr-2" />
                  Visit Panchayat Office
                </div>
                <div className="flex items-center text-blue-700">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Call Helpdesk: 1800-XXX-XXXX
                </div>
                <div className="flex items-center text-blue-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Download User Guide
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
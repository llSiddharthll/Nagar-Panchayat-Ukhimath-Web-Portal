'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Download,
  FileText,
  Search,
  Filter,
  Lock,
  Calendar,
  FileDown,
  AlertCircle,
  Building2,
  Bell,
  Scale,
  BarChart3,
  BookOpen,
  Archive,
  Shield,
  UserCheck,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Clock
} from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

interface DownloadItem {
  id: number;
  title: string;
  category: string;
  file_path: string;
  file_size: string;
  upload_date: string;
  description?: string;
  download_count: number;
  last_updated: string;
  is_important: boolean;
}

export default function Downloads() {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [filteredDownloads, setFilteredDownloads] = useState<DownloadItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const categories = [
    'All',
    'Forms (PDF)',
    'Notifications',
    'Tenders',
    'Budget Reports',
    'Citizen Charter',
    'Guidelines',
    'Other'
  ];

  const categoryIcons = {
    'Forms (PDF)': <FileText className="w-5 h-5" />,
    'Notifications': <Bell className="w-5 h-5" />,
    'Tenders': <Scale className="w-5 h-5" />,
    'Budget Reports': <BarChart3 className="w-5 h-5" />,
    'Citizen Charter': <BookOpen className="w-5 h-5" />,
    'Guidelines': <Archive className="w-5 h-5" />,
    'Other': <FileDown className="w-5 h-5" />
  };

  useEffect(() => {
    checkAuth();
    fetchDownloads();
  }, []);

  useEffect(() => {
    filterAndSortDownloads();
  }, [downloads, selectedCategory, searchTerm, sortBy]);

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

  const fetchDownloads = async () => {
    try {
      // Mock data - replace with actual API call
      const mockDownloads: DownloadItem[] = [
        {
          id: 1,
          title: 'Citizen Charter 2024',
          category: 'Citizen Charter',
          file_path: '/downloads/citizen-charter-2024.pdf',
          file_size: '2.4 MB',
          upload_date: '2024-01-15',
          description: 'Complete guide to citizen services, processing times, and service guarantees provided by the Panchayat.',
          download_count: 245,
          last_updated: '2024-01-15',
          is_important: true
        },
        {
          id: 2,
          title: 'Annual Budget Report 2024-25',
          category: 'Budget Reports',
          file_path: '/downloads/budget-2024-25.pdf',
          file_size: '5.1 MB',
          upload_date: '2024-01-10',
          description: 'Detailed budget allocation, expenditure report, and financial planning for the fiscal year 2024-25.',
          download_count: 189,
          last_updated: '2024-01-10',
          is_important: true
        },
        {
          id: 3,
          title: 'Public Notice: Road Construction',
          category: 'Notifications',
          file_path: '/downloads/road-construction-notice.pdf',
          file_size: '1.2 MB',
          upload_date: '2024-01-18',
          description: 'Official notification regarding upcoming road construction work in Sector 5 and detour routes.',
          download_count: 156,
          last_updated: '2024-01-18',
          is_important: false
        },
        {
          id: 4,
          title: 'Tender: Water Supply System',
          category: 'Tenders',
          file_path: '/downloads/water-supply-tender.pdf',
          file_size: '3.8 MB',
          upload_date: '2024-01-12',
          description: 'Invitation for bids for installation and maintenance of water supply system infrastructure.',
          download_count: 98,
          last_updated: '2024-01-12',
          is_important: false
        },
        {
          id: 5,
          title: 'Sanitation Guidelines',
          category: 'Guidelines',
          file_path: '/downloads/sanitation-guidelines.pdf',
          file_size: '1.8 MB',
          upload_date: '2024-01-08',
          description: 'Comprehensive guidelines for waste management, sanitation practices, and public health measures.',
          download_count: 203,
          last_updated: '2024-01-08',
          is_important: false
        },
        {
          id: 6,
          title: 'All Application Forms Bundle',
          category: 'Forms (PDF)',
          file_path: '/downloads/all-forms-bundle.pdf',
          file_size: '4.2 MB',
          upload_date: '2024-01-05',
          description: 'Complete collection of all official application forms for various Panchayat services.',
          download_count: 312,
          last_updated: '2024-01-05',
          is_important: true
        }
      ];
      
      setDownloads(mockDownloads);
    } catch (error) {
      console.error('Failed to fetch downloads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortDownloads = () => {
    let filtered = downloads;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Sort downloads
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'recent':
          return new Date(b.upload_date).getTime() - new Date(a.upload_date).getTime();
        case 'popular':
          return b.download_count - a.download_count;
        case 'size':
          return parseFloat(b.file_size) - parseFloat(a.file_size);
        default:
          return 0;
      }
    });

    setFilteredDownloads(filtered);
  };

  const handleDownload = async (itemId: number, fileName: string) => {
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

  const getCategoryCount = (category: string) => {
    if (category === 'All') return downloads.length;
    return downloads.filter(item => item.category === category).length;
  };

  const formatFileSize = (size: string) => {
    return size;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-blue-700">Loading documents and resources...</p>
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
                <Download className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Downloads & Resources
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Access official documents, reports, forms, and important resources published by the Panchayat. 
              All documents are verified and officially released.
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
                  to download official documents. This ensures secure access to government resources.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-6 text-center">
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{downloads.length}</div>
            <div className="text-sm text-gray-600">Total Documents</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-6 text-center">
            <Download className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {downloads.reduce((sum, item) => sum + item.download_count, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Downloads</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-6 text-center">
            <AlertCircle className="w-8 h-8 text-amber-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {downloads.filter(item => item.is_important).length}
            </div>
            <div className="text-sm text-gray-600">Important Updates</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-6 text-center">
            <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">100%</div>
            <div className="text-sm text-gray-600">Verified Documents</div>
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
                placeholder="Search documents by title, description, or category..."
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
                <option value="recent">Sort by Recent</option>
                <option value="name">Sort by Name</option>
                <option value="popular">Sort by Popularity</option>
                <option value="size">Sort by Size</option>
              </select>
            </div>
          </div>
        </div>

        {/* Downloads List */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Available Documents ({filteredDownloads.length})
            </h2>
            <div className="text-sm text-gray-500">
              Showing {filteredDownloads.length} of {downloads.length} documents
            </div>
          </div>

          {filteredDownloads.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-blue-100">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {searchTerm || selectedCategory !== 'All' 
                  ? 'Try adjusting your search terms or filters'
                  : 'No documents are currently available for download'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDownloads.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 overflow-hidden group ${
                    item.is_important ? 'border-amber-200 bg-amber-25' : 'border-blue-100'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`p-3 rounded-lg ${
                          item.is_important ? 'bg-amber-100' : 'bg-blue-100'
                        } group-hover:scale-105 transition-transform duration-200`}>
                          {categoryIcons[item.category as keyof typeof categoryIcons] || <FileText className="w-6 h-6 text-blue-600" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 pr-4">
                              {item.title}
                            </h3>
                            {item.is_important && (
                              <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium flex items-center whitespace-nowrap">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Important
                              </span>
                            )}
                          </div>
                          
                          <p className="text-gray-600 mb-4 leading-relaxed">
                            {item.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <span className={`px-2 py-1 rounded-full font-medium ${
                              item.is_important ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'
                            }`}>
                              {item.category}
                            </span>
                            <div className="flex items-center">
                              <FileDown className="w-4 h-4 mr-1" />
                              {formatFileSize(item.file_size)}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Uploaded {new Date(item.upload_date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Download className="w-4 h-4 mr-1" />
                              {item.download_count} downloads
                            </div>
                            {item.last_updated !== item.upload_date && (
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                Updated {new Date(item.last_updated).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleDownload(item.id, `${item.title}.pdf`)}
                        className={`py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 whitespace-nowrap ${
                          item.is_important 
                            ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        <Download className="w-4 h-4" />
                        Download
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Categories Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Document Categories
            </h2>
            <p className="text-gray-600">
              Browse resources by category to find specific types of documents
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.filter(cat => cat !== 'All').map((category) => {
              const count = downloads.filter(item => item.category === category).length;
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
                  <div className="text-xs text-gray-500">documents</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start space-x-4">
            <UserCheck className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Need Help Accessing Documents?</h3>
              <p className="text-blue-800 mb-3">
                If you encounter issues downloading documents or need assistance finding specific information, 
                our support team is available to help you.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center text-blue-700">
                  <Phone className="w-4 h-4 mr-2" />
                  Helpline: 1800-XXX-XXXX
                </div>
                <div className="flex items-center text-blue-700">
                  <Mail className="w-4 h-4 mr-2" />
                  documents@panchayat.gov.in
                </div>
                <div className="flex items-center text-blue-700">
                  <MapPin className="w-4 h-4 mr-2" />
                  Visit Records Section at Panchayat Office
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
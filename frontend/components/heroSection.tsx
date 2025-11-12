import { useState, useEffect } from 'react';
import { ChevronRight, AlertCircle, Megaphone, Calendar, FileText, Users, Home, Shield } from 'lucide-react';
import { GiElectric, GiTrophy } from 'react-icons/gi';
import { FaLeaf } from 'react-icons/fa';

const HeroSection = () => {
  const [currentNotice, setCurrentNotice] = useState(0);

  const notices = [
    {
      id: 1,
      type: 'announcement',
      title: 'Winter Seat Transition',
      content: 'Deities of Kedarnath & Madhyamaheshwar shifted to Omkareshwar Temple for winter worship (Nov-Apr)',
      date: 'Active',
      icon: <AlertCircle className="w-4 h-4" />
    },
    {
      id: 2,
      type: 'tender',
      title: 'Infrastructure Development',
      content: 'Road maintenance and development projects underway across municipal area',
      date: 'Deadline: Dec 15, 2024',
      icon: <Megaphone className="w-4 h-4" />
    },
    {
      id: 3,
      type: 'service',
      title: 'Digital Services Available',
      content: 'Online portal for birth certificates, property tax, and civic grievance redressal',
      date: '24/7 Available',
      icon: <FileText className="w-4 h-4" />
    },
    {
      id: 4,
      type: 'event',
      title: 'Madhyamaheshwar Mela',
      content: 'Annual cultural festival at Omkareshwar Temple featuring spiritual activities',
      date: 'Coming Soon',
      icon: <Calendar className="w-4 h-4" />
    },
    {
      id: 5,
      type: 'development',
      title: 'Housing Scheme 2024',
      content: 'PMAY 2.0 applications open for affordable housing solutions',
      date: 'Apply Now',
      icon: <Home className="w-4 h-4" />
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotice((prev) => (prev + 1) % notices.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [notices.length]);

  const getTypeColor = (type: string) => {
    const colorMap = {
      'announcement': 'bg-blue-100 text-blue-800 border-blue-200',
      'tender': 'bg-blue-100 text-blue-800 border-blue-200',
      'service': 'bg-blue-100 text-blue-800 border-blue-200',
      'event': 'bg-blue-100 text-blue-800 border-blue-200',
      'development': 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return colorMap[type as keyof typeof colorMap] || 'bg-blue-100 text-blue-800 border-blue-200';
  };

  const currentNoticeData = notices[currentNotice];

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 text-gray-900 container mx-auto px-4 py-16 rounded-b-3xl overflow-hidden mb-12 border-b border-blue-200">
      
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-br from-blue-100 to-blue-50 -skew-x-12 transform origin-top-right"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-blue-50 rounded-full filter blur-3xl opacity-50"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          
          <div className="max-w-2xl flex-1">
            

            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight text-gray-800">
              Welcome to
              <span className="block text-4xl md:text-5xl text-blue-600 font-bold mt-2">
                Ukhimath Nagar Panchayat
              </span>
            </h1>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed font-medium text-justify">
              Gateway to efficient civic services and transparent local governance. 
              Committed to sustainable development and citizen welfare in the sacred 
              winter seat of Lord Kedarnath.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Citizen Services Portal
              </button>
              <button className="border-2 border-blue-300 hover:border-blue-600 hover:text-blue-600 text-blue-700 px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Government Schemes
              </button>
            </div>

            
            <div className="flex flex-wrap gap-3">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 flex gap-2 items-center">
                <GiTrophy /> <span>Excellence in Urban Governance 2024</span>
              </span>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 flex gap-2 items-center">
                <GiElectric className='text-lg'/> <span>100% Digital Services</span>
              </span>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 flex gap-2 items-center">
                <FaLeaf /> <span>Sustainable Development</span>
              </span>
            </div>
          </div>

          
          <div className="lg:w-[28rem] w-full bg-white rounded-2xl shadow-xl border border-blue-200 overflow-hidden">
            
            <div className="bg-gradient-to-r from-blue-700 to-blue-800 p-4 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Megaphone className="w-5 h-5" />
                  Live Notice Board
                </h2>
                <div className="flex items-center gap-1">
                  {notices.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentNotice ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-blue-100 mt-1">Latest Updates & Important Announcements</p>
            </div>

            
            <div className="p-4 h-64 bg-gradient-to-b from-white to-blue-50">
              <div className="animate-fade-in">
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border mb-3 ${getTypeColor(currentNoticeData.type)}`}>
                  {currentNoticeData.icon}
                  {currentNoticeData.type.charAt(0).toUpperCase() + currentNoticeData.type.slice(1)}
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                  {currentNoticeData.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-6 text-justify">
                  {currentNoticeData.content}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{currentNoticeData.date}</span>
                  <span className="text-blue-600 font-medium cursor-pointer hover:underline flex items-center gap-1">
                    Read more
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>

            
            <div className="border-t border-blue-200 p-3 bg-blue-50">
              <div className="flex justify-between items-center text-sm">
                <span className="text-blue-700 font-medium">{notices.length} active notices</span>
                <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors">
                  View All Notices
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
import { BsBank } from "react-icons/bs";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { IoCall } from "react-icons/io5";
import { MdForum, MdOnlinePrediction } from "react-icons/md";
import { TbTax } from "react-icons/tb";
import { FaArrowRight, FaFileAlt, FaLaptop, FaReceipt, FaBullhorn, FaUserTie, FaPhoneAlt } from "react-icons/fa";

// Quick Links Component
const QuickLinks = () => {
  const links = [
    {
      icon: <FaFileAlt className="text-2xl" />,
      title: "Online Forms",
      description: "Apply for various certificates and services online",
      href: "/services/forms",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <FaLaptop className="text-2xl" />,
      title: "E-Services Portal",
      description: "Access Uttarakhand Service Online for all digital services",
      href: "https://serviceonline.gov.in/uttarakhand/",
      gradient: "from-blue-600 to-blue-700"
    },
    {
      icon: <FaReceipt className="text-2xl" />,
      title: "Property Tax",
      description: "Pay your property tax online quickly and securely",
      href: "/services/tax",
      gradient: "from-blue-700 to-blue-800"
    },
    {
      icon: <FaBullhorn className="text-2xl" />,
      title: "Public Notices",
      description: "Latest announcements, tenders and circulars",
      href: "/notices",
      gradient: "from-blue-800 to-blue-900"
    },
    {
      icon: <FaUserTie className="text-2xl" />,
      title: "Administration",
      description: "Meet your representatives and council members",
      href: "/about",
      gradient: "from-blue-900 to-blue-950"
    },
    {
      icon: <FaPhoneAlt className="text-2xl" />,
      title: "Emergency Contacts",
      description: "Important contact numbers for urgent assistance",
      href: "/contact",
      gradient: "from-blue-950 to-blue-900"
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-blue-200 mb-4">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <FaArrowRight className="text-blue-600 text-sm" />
            </div>
            <h2 className="text-4xl font-bold text-blue-800">Quick Access</h2>
          </div>
          <p className="text-xl text-blue-700 max-w-2xl mx-auto font-medium">
            Fast access to essential services and important information of Nagar Panchayat Ukhimath
          </p>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-200 overflow-hidden hover:border-blue-300 hover:-translate-y-2"
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Icon with Gradient Background */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${link.gradient} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-white text-2xl">
                      {link.icon}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-blue-800 mb-2 group-hover:text-blue-700 transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-blue-600 text-sm leading-relaxed mb-3">
                      {link.description}
                    </p>
                    <div className="flex items-center text-blue-500 group-hover:text-blue-600 transition-colors">
                      <span className="text-sm font-semibold">Access Now</span>
                      <FaArrowRight className="ml-2 text-xs transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Hover Effect Bar */}
              <div className="h-1 bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg border border-blue-200 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <FaFileAlt className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-bold text-blue-800">Easy Access</h4>
              <p className="text-blue-600 text-sm">Quick links to most used services</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <FaLaptop className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-bold text-blue-800">Digital First</h4>
              <p className="text-blue-600 text-sm">100% online service availability</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <FaPhoneAlt className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-bold text-blue-800">24/7 Support</h4>
              <p className="text-blue-600 text-sm">Always available to help you</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center gap-3">
            
            Explore All Services
            <FaArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
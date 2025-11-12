import { Mail, Phone, Pin } from "lucide-react";
import Image from "next/image";
import { BiBuilding } from "react-icons/bi";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white container mx-auto px-4 rounded-t-2xl">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-20 mb-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              
              <h3 className="text-xl font-bold text-white">Contact Information</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                <span className="text-gray-400"><Mail /></span>
                <a href="mailto:npukhimath@gmail.com" className="hover:text-blue-300 transition-colors">
                  npukhimath@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                <span className="text-gray-400"><Phone /></span>
                <a href="tel:9412132732" className="hover:text-green-300 transition-colors">
                  9412132732
                </a>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                <span className="text-gray-400"><Pin /></span>
                <div>
                  <p className="text-sm">Nagar Panchayat Ukhimath</p>
                  <p className="text-sm text-gray-300">Rudraprayag District, Uttarakhand</p>
                  <p className="text-sm text-gray-300">PIN: 246469</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              
              <h3 className="text-xl font-bold text-white -ms-4">Quick Links</h3>
            </div>
            <ul className="space-y-2">
              {[
                { name: "Online Services", href: "/services/forms", icon: "💻" },
                { name: "Public Notices", href: "/notices", icon: "📢" },
                { name: "Government Schemes", href: "/schemes", icon: "📋" },
                { name: "Photo Gallery", href: "/gallery", icon: "🖼️" },
                { name: "News & Events", href: "/news", icon: "📰" },
              ].map((link, index) => (
                <li key={index} className="list-disc">
                  <a
                    href={link.href}
                    className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-gray-800 transition-all duration-200 group"
                  >
                    <span className="text-gray-300 group-hover:text-white transition-colors">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              
              <h3 className="text-xl font-bold text-white -ms-4">Important Links</h3>
            </div>
            <ul className="space-y-2">
              {[
                { name: "District Rudraprayag", href: "https://rudraprayag.gov.in", icon: <BiBuilding/> },
                { name: "Uttarakhand Service Online", href: "https://serviceonline.gov.in/uttarakhand/", icon: "🌐" },
                { name: "Urban Development Department", href: "https://udd.uk.gov.in", icon: "🏗️" },
                { name: "Uttarakhand Tourism", href: "https://uttarakhandtourism.gov.in", icon: "🏔️" },
                { name: "Housing & Urban Development", href: "https://uhuda.uk.gov.in", icon: "🏠" },
              ].map((link, index) => (
                <li key={index} className="list-disc">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-gray-800 transition-all duration-200 group"
                  >
                    <span className="text-gray-300 group-hover:text-white transition-colors text-sm">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          
        </div>

        {/* Social & Additional Links */}
        <div className="border-t border-gray-700 pt-8 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 font-semibold">Follow Us:</span>
              <div className="flex space-x-4">
                {[
                  { name: "Facebook", icon: <FaInstagram />, href: "#" },
                  { name: "Twitter", icon: <FaXTwitter />, href: "#" },
                  { name: "YouTube", icon: <FaFacebook />, href: "#" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                    title={social.name}
                  >
                    <span className="text-white">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/sitemap" className="text-gray-400 hover:text-white transition-colors text-sm">
                Sitemap
              </a>
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Use
              </a>
              <a href="/accessibility" className="text-gray-400 hover:text-white transition-colors text-sm">
                Accessibility
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-white font-semibold">
                © 2025 Nagar Panchayat Ukhimath. All Rights Reserved.
              </p>
              <p className="text-gray-400 text-sm mt-1">
                This is the official website of Nagar Panchayat Ukhimath, Rudraprayag District, Uttarakhand
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Image
                src="/img/logo.svg"
                alt="Govt of India Logo"
                width={40}
                height={40}
                className="p-2 h-16 w-auto bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
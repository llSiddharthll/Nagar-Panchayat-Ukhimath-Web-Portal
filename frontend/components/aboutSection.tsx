"use client";
import { FaMapMarkerAlt, FaMountain, FaBuilding, FaUsers } from "react-icons/fa";
import { MdAdminPanelSettings, MdTempleBuddhist, MdHistory } from "react-icons/md";
import { IoBusiness, IoStatsChart, IoPeople } from "react-icons/io5";

// About Section Component
const AboutSection = () => {
  const stats = [
    { icon: <IoPeople className="text-xl" />, value: "3,125", label: "Population", sublabel: "2011 Census" },
    { icon: <FaMapMarkerAlt className="text-xl" />, value: "2.78", label: "Area", sublabel: "Square Kilometers" },
    { icon: <FaMountain className="text-xl" />, value: "1,311", label: "Elevation", sublabel: "Meters above sea level" },
    { icon: <FaBuilding className="text-xl" />, value: "4", label: "Wards", sublabel: "Administrative Divisions" }
  ];

  return (
    <section id="about" className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-blue-200 mb-4">
            <IoBusiness className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl font-bold text-blue-800">About Nagar Panchayat Ukhimath</h2>
          </div>
          <p className="text-lg text-blue-700 max-w-2xl mx-auto">
            Administrative hub and winter spiritual center in Rudraprayag District
          </p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg border border-blue-200 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-600">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-blue-800 mb-1">{stat.value}</div>
              <div className="text-blue-700 font-semibold">{stat.label}</div>
              <div className="text-blue-600 text-sm">{stat.sublabel}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <MdHistory className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-blue-800">Establishment</h3>
              </div>
              <p className="text-blue-700">
                Formally constituted as Nagar Panchayat on July 7, 2012, combining Dangwari and Bhatwari villages.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <MdAdminPanelSettings className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-blue-800">Administration</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <strong className="text-blue-800">Elected Chairman</strong>
                  <p className="text-blue-600 text-sm">Head of Municipal Board</p>
                </div>
                <div>
                  <strong className="text-blue-800">Executive Officer</strong>
                  <p className="text-blue-600 text-sm">Administrative Head</p>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {["Gandhinagar", "Udaypur", "Omkareshwar", "Bhatteshwar"].map((ward) => (
                    <div key={ward} className="bg-blue-50 p-2 rounded-lg text-center">
                      <span className="text-blue-700 font-medium text-sm">{ward}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <MdTempleBuddhist className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-blue-800">Spiritual Significance</h3>
              </div>
              <p className="text-blue-700 mb-3">
                Winter abode for Kedarnath and Madhyamaheshwar deities during November to April.
              </p>
              <p className="text-blue-600 text-sm">
                Home to sacred Omkareshwar Temple at 1,300 meters elevation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <FaMapMarkerAlt className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-blue-800">Connectivity</h3>
              </div>
              <div className="space-y-2 text-blue-700">
                <p><strong>Road:</strong> 41km from Rudraprayag, 13km from Guptkashi</p>
                <p><strong>Rail:</strong> Rishikesh (175km)</p>
                <p><strong>Air:</strong> Jolly Grant, Dehradun (195km)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center mt-12 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-3">Need More Information?</h3>
          <p className="text-blue-100 mb-6">Contact the Nagar Panchayat office for detailed queries</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
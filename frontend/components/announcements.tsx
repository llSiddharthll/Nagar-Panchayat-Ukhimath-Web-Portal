import { AiFillAlert } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoIosWarning } from "react-icons/io";
import { Megaphone, Calendar, FileText, AlertTriangle } from "lucide-react";

// Important Announcements Component
const Announcements = () => {
  const announcements = [
    {
      type: "alert",
      text: "Road maintenance work on Mayali-Guptkashi Motor Road from Nov 20-25",
      date: "Active until Nov 25",
      priority: "high"
    },
    {
      type: "info",
      text: "Property tax payment deadline extended to December 15, 2024",
      date: "Extended deadline",
      priority: "medium"
    },
    {
      type: "warning",
      text: "Winter preparedness meeting scheduled for all ward representatives",
      date: "Upcoming meeting",
      priority: "medium"
    },
    {
      type: "info",
      text: "New online portal for birth and death certificate applications now available",
      date: "New service",
      priority: "low"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="w-5 h-5" />;
      case "warning":
        return <IoIosWarning className="w-5 h-5" />;
      case "info":
        return <BsFillInfoCircleFill className="w-5 h-5" />;
      default:
        return <BsFillInfoCircleFill className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-4 border-l-blue-600 bg-blue-50";
      case "medium":
        return "border-l-4 border-l-blue-500 bg-blue-50";
      case "low":
        return "border-l-4 border-l-blue-400 bg-blue-50";
      default:
        return "border-l-4 border-l-blue-500 bg-blue-50";
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      alert: "text-blue-700 bg-blue-100",
      warning: "text-blue-700 bg-blue-100", 
      info: "text-blue-700 bg-blue-100"
    };
    return colors[type as keyof typeof colors] || "text-blue-700 bg-blue-100";
  };

  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-12 container mx-auto px-4 my-8 rounded-2xl shadow-sm border border-blue-200">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-blue-200 mb-4">
            <Megaphone className="w-6 h-6 text-blue-600" />
            <h3 className="text-3xl font-bold text-blue-800">
              Important Announcements
            </h3>
          </div>
          <p className="text-blue-700 text-lg max-w-2xl mx-auto">
            Stay updated with the latest news and important updates from Nagar Panchayat Ukhimath
          </p>
        </div>

        {/* Announcements Grid - Better space utilization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {announcements.map((announcement, index) => (
            <div
              key={index}
              className={`${getPriorityColor(announcement.priority)} p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] group`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`p-3 rounded-lg ${getTypeColor(announcement.type)} flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  {getIcon(announcement.type)}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(announcement.type)}`}>
                      {announcement.type.toUpperCase()}
                    </span>
                    <span className="text-blue-600 text-sm font-medium">
                      {announcement.date}
                    </span>
                  </div>
                  <p className="text-gray-800 text-lg leading-relaxed font-medium">
                    {announcement.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Section - Utilizing more space */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-blue-200 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-bold text-blue-800">Regular Updates</h4>
              <p className="text-blue-700 text-sm">Check back frequently for the latest announcements</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-bold text-blue-800">Detailed Information</h4>
              <p className="text-blue-700 text-sm">Complete details available in notices section</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-bold text-blue-800">Priority Alerts</h4>
              <p className="text-blue-700 text-sm">Critical updates marked for immediate attention</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2">
            View All Announcements
            <Megaphone className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Announcements;
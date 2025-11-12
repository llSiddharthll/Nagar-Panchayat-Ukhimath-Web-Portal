import { FaNewspaper, FaArrowRight, FaCalendarAlt, FaTag } from "react-icons/fa";


const NewsUpdates = () => {
  const newsItems = [
    {
      title: "Winter Char Dham Yatra Schedule 2024",
      date: "2024-11-15",
      category: "Tourism",
      excerpt:
        "Schedule for winter deity transfer to Omkareshwar Temple announced",
    },
    {
      title: "New Infrastructure Development Projects",
      date: "2024-11-10",
      category: "Development",
      excerpt: "Road construction and disaster resilience projects underway",
    },
    {
      title: "PMAY 2.0 Housing Scheme Applications",
      date: "2024-11-05",
      category: "Schemes",
      excerpt: "Apply for affordable housing under Pradhan Mantri Awas Yojana",
    },
  ];

  
  const formatDate = (dateString: string | number | Date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' } as const;
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
       
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-blue-200 mb-4">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <FaNewspaper className="text-blue-600 text-sm" />
            </div>
            <h2 className="text-4xl font-bold text-blue-800">News & Updates</h2>
          </div>
          <p className="text-xl text-blue-700 max-w-2xl mx-auto font-medium">
            Stay informed with the latest announcements and developments from Nagar Panchayat Ukhimath
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {newsItems.map((news, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-200 overflow-hidden hover:border-blue-300 hover:-translate-y-2"
            >
              <div className="p-6">
                {/* Category and Date */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2 bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    <FaTag className="text-xs" />
                    <span className="font-semibold">{news.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 text-sm">
                    <FaCalendarAlt className="text-xs" />
                    <span className="font-medium">{formatDate(news.date)}</span>
                  </div>
                </div>

                {/* Title and Excerpt */}
                <h3 className="text-xl font-bold text-blue-800 mb-3 group-hover:text-blue-700 transition-colors line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-blue-600 leading-relaxed mb-6 line-clamp-3">
                  {news.excerpt}
                </p>

                {/* Read More Button */}
                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors group/btn">
                  <span>Read More</span>
                  <FaArrowRight className="text-xs transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
              
              {/* Hover Effect Bar */}
              <div className="h-1 bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center gap-3">
            <FaNewspaper className="w-4 h-4" />
            View All News & Updates
            <FaArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsUpdates;
// Tourism Highlights Component
const TourismHighlights = () => {
  const highlights = [
    {
      title: "Omkareshwar Temple",
      description: "Winter seat of Lord Kedarnath and Madhyamaheshwar",
      features: [
        "Religious Significance",
        "Historical Architecture",
        "Winter Pilgrimage",
      ],
      thumbnail: "/img/temple-1.jpg",
    },
    {
      title: "Gateway to Treks",
      description: "Base for Madhyamaheshwar, Tungnath, and Chandrashila treks",
      features: ["Adventure Tourism", "Scenic Beauty", "Himalayan Views"],
      thumbnail: "/img/highlight-2.jpg",
    },
    {
      title: "Deoria Tal",
      description: "Pristine lake with stunning reflections of Himalayan peaks",
      features: ["Natural Beauty", "Photography", "Trekking Destination"],
    thumbnail: "/img/highlight-3.jpg",
    },
  ];

  return (
    <section className="bg-green-50 py-12 container mx-auto px-4 rounded-lg mb-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Tourism & Cultural Heritage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div
                className="h-48 bg-cover bg-center flex items-center justify-center"
                style={
                  highlight.thumbnail
                    ? { backgroundImage: `url(${highlight.thumbnail})` }
                    : { backgroundColor: "#f3f4f6" } // fallback bg
                }
              ></div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {highlight.title}
                </h3>
                <p className="text-gray-700 mb-4">{highlight.description}</p>
                <div className="flex flex-wrap gap-2">
                  {highlight.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="bg-green-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourismHighlights;

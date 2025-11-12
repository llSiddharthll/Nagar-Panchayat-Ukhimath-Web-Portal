import Footer from "@/components/footer";
import Header from "@/components/header";
import { FaMountain, FaHistory, FaUsers, FaMapMarkerAlt, FaTree, FaRoad, FaBus, FaTrain, FaPlane } from "react-icons/fa";
import { GiAncientColumns, GiMountainRoad } from "react-icons/gi";
import { MdOutlineAdminPanelSettings, MdTempleBuddhist, MdTempleHindu } from "react-icons/md";

const About = () => {
  // Placeholder image URLs - replace with actual images
  const placeholderImages = {
    temple: "/img/omkareshwar-temple.jpg",
    mountains: "/img/himalayan-range.jpg",
    town: "/img/local-view.webp",
    administration: "/img/admin.jpg"
  };

  const administrativeInfo = {
    establishment: "July 7, 2012",
    area: "2.78263 sq.km",
    elevation: "1311 meters (4,301 ft)",
    population: "3,125 (2011 Census)",
    pincode: "246469",
    email: "npukhimath@gmail.com",
    contact: "9412132732"
  };

  const wards = [
    { name: "Gandhinagar (गाँधीनगर)", representatives: ["Anjali Devi", "Pooja Devi"] },
    { name: "Udaypur (उदयपुर)", representatives: ["Sarita Devi", "Sarla Devi"] },
    { name: "Omkareshwar (ओम्कारेश्वर)", representatives: ["Pawan Rana", "Pradeep Singh"] },
    { name: "Bhatteshwar (भटटेश्वर)", representatives: ["Balbeer Singh", "Jagmohan Singh"] }
  ];

  const spiritualSignificance = [
    {
      icon: <MdTempleHindu className="text-3xl" />,
      title: "Winter Seat of Kedarnath",
      description: "Serves as the winter abode for Lord Kedarnath deities from November to April"
    },
    {
      icon: <GiAncientColumns className="text-3xl" />,
      title: "Madhyamaheshwar Deities",
      description: "Hosts the deities of Madhyamaheshwar temple during winter months"
    },
    {
      icon: <FaTree className="text-3xl" />,
      title: "Mythological Heritage",
      description: "Site of Usha-Aniruddha marriage and Pandava rituals from Mahabharata"
    }
  ];

  const connectivity = [
    {
      icon: <FaRoad className="text-2xl" />,
      title: "By Road",
      details: "41 km from Rudraprayag, 13 km from Guptkashi"
    },
    {
      icon: <FaTrain className="text-2xl" />,
      title: "By Rail",
      details: "Nearest rail head: Rishikesh (175-180 km)"
    },
    {
      icon: <FaPlane className="text-2xl" />,
      title: "By Air",
      details: "Nearest airport: Jolly Grant, Dehradun (195-200 km)"
    }
  ];

  const trekkingRoutes = [
    "Madhyamaheshwar (Second Kedar)",
    "Tungnath Ji (Third Kedar)",
    "Chandrashila Summit",
    "Deoria Tal"
  ];

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <Header />
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm border border-white/30 mb-6">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <FaMountain className="text-white text-sm" />
            </div>
            <h1 className="text-4xl font-bold">About Nagar Panchayat Ukhimath</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto font-medium">
            The Spiritual Gateway to Panch Kedar and Administrative Hub of Rudraprayag District
          </p>
        </div>
      </section>

      {/* Administrative Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-blue-200 mb-4">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <MdOutlineAdminPanelSettings className="text-blue-600 text-sm" />
              </div>
              <h2 className="text-3xl font-bold text-blue-800">Administrative Profile</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <img 
                src={placeholderImages.administration} 
                alt="Nagar Panchayat Ukhimath Administration"
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-200">
                  <FaHistory className="text-blue-600 text-2xl mb-3" />
                  <h3 className="font-bold text-blue-800 mb-2">Established</h3>
                  <p className="text-blue-600">{administrativeInfo.establishment}</p>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-200">
                  <FaMapMarkerAlt className="text-blue-600 text-2xl mb-3" />
                  <h3 className="font-bold text-blue-800 mb-2">Area</h3>
                  <p className="text-blue-600">{administrativeInfo.area}</p>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-200">
                  <FaMountain className="text-blue-600 text-2xl mb-3" />
                  <h3 className="font-bold text-blue-800 mb-2">Elevation</h3>
                  <p className="text-blue-600">{administrativeInfo.elevation}</p>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-200">
                  <FaUsers className="text-blue-600 text-2xl mb-3" />
                  <h3 className="font-bold text-blue-800 mb-2">Population</h3>
                  <p className="text-blue-600">{administrativeInfo.population}</p>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <p className="text-blue-600"><strong>Email:</strong> {administrativeInfo.email}</p>
                  <p className="text-blue-600"><strong>Contact:</strong> {administrativeInfo.contact}</p>
                  <p className="text-blue-600"><strong>Pincode:</strong> {administrativeInfo.pincode}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spiritual Significance */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-blue-50 px-6 py-3 rounded-full shadow-sm border border-blue-200 mb-4">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <MdTempleBuddhist className="text-blue-600 text-sm" />
              </div>
              <h2 className="text-3xl font-bold text-blue-800">Spiritual Significance</h2>
            </div>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto">
              Winter Abode of Kedarnath and Madhyamaheshwar Deities
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-12">
            <div>
              <img 
                src={placeholderImages.temple} 
                alt="Omkareshwar Temple Ukhimath"
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">Omkareshwar Temple</h3>
              <p className="text-blue-600 leading-relaxed text-justify">
                The sacred Omkareshwar Temple at 1,300 meters elevation serves as the winter seat for 
                Lord Kedarnath and Madhyamaheshwar deities during the six-month winter season when 
                the high-altitude temples are inaccessible due to heavy snowfall.
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                {spiritualSignificance.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 bg-blue-50 p-4 rounded-xl">
                    <div className="text-blue-600 mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-blue-800 mb-1">{item.title}</h4>
                      <p className="text-blue-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mythology Section */}
          <div className="bg-blue-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">Mythological Heritage</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-3">Emperor Mandhata's Penance</h4>
                <p className="text-blue-600 text-sm text-justify">
                  The temple derives its name from Lord Shiva appearing in the form of the sacred sound 
                  "Omkar" after Emperor Mandhata performed twelve years of intense penance.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-3">Usha-Aniruddha Marriage</h4>
                <p className="text-blue-600 text-sm text-justify">
                  Originally known as Ushamath, the town witnessed the sacred marriage of Usha 
                  (daughter of demon king Vanasur) and Aniruddha (grandson of Lord Krishna).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ward Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Administrative Wards</h2>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto">
              Four wards representing the municipal jurisdiction of Ukhimath
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {wards.map((ward, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-blue-200 p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4">{ward.name}</h3>
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-700">Ward Representatives:</h4>
                  {ward.representatives.map((rep, repIndex) => (
                    <p key={repIndex} className="text-blue-600 pl-4">• {rep}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connectivity & Tourism */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-blue-50 px-6 py-3 rounded-full shadow-sm border border-blue-200 mb-4">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <GiMountainRoad className="text-blue-600 text-sm" />
              </div>
              <h2 className="text-3xl font-bold text-blue-800">Connectivity & Tourism</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* How to Reach */}
            <div>
              <h3 className="text-2xl font-bold text-blue-800 mb-6">How to Reach Ukhimath</h3>
              <div className="space-y-4">
                {connectivity.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 bg-blue-50 p-4 rounded-xl">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-800">{item.title}</h4>
                      <p className="text-blue-600 text-sm">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trekking Routes */}
            <div>
              <h3 className="text-2xl font-bold text-blue-800 mb-6">Gateway to Himalayan Treks</h3>
              <div className="bg-blue-50 rounded-2xl p-6">
                <p className="text-blue-600 mb-4">
                  Ukhimath serves as the strategic base for several important spiritual and adventure treks:
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {trekkingRoutes.map((route, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-blue-800 font-medium">{route}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <img 
                  src={placeholderImages.mountains} 
                  alt="Himalayan Peaks view from Ukhimath"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Focus */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Development Focus</h2>
            <p className="text-lg text-blue-600 leading-relaxed text-justify">
              Since its establishment in 2012, Nagar Panchayat Ukhimath has focused on infrastructure 
              resilience, reconstruction, and sustainable urban development, particularly following 
              the 2013 disaster. The municipality actively implements schemes like PMAY 2.0 and 
              emphasizes disaster management and pilgrimage infrastructure development.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
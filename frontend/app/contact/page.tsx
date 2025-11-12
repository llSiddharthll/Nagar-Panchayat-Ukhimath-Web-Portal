"use client";
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Our Office",
      details: "Nagar Panchayat Ukhimath, Rudraprayag District, Uttarakhand, 246419",
      description: "Winter Seat of Lord Kedarnath"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: "+91-94121-32732",
      description: "Mon-Sat, 9:00 AM - 6:00 PM"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: "npukhimath@gmail.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Office Hours",
      details: "9:00 AM - 5:00 PM",
      description: "Monday to Saturday (Except holidays)"
    }
  ];

  const emergencyContacts = [
    { name: "Police Control Room", number: "100", type: "emergency" },
    { name: "Ambulance", number: "108", type: "emergency" },
    { name: "Fire Station", number: "101", type: "emergency" },
    { name: "Tourist Helpline", number: "1363", type: "helpline" },
    { name: "Disaster Management", number: "1070", type: "helpline" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 py-12 container mx-auto px-4">
      {/* Header Section */}
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Get In <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're here to serve you. Reach out to Nagar Panchayat Ukhimath for any queries, 
            services, or assistance you may need.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Information Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Main Contact Cards */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <MapPin className="text-blue-600" />
                Contact Information
              </h2>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.title}</h3>
                      <p className="text-gray-700 font-medium">{item.details}</p>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-lg p-6 border border-red-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Emergency Contacts</h2>
              <div className="space-y-3">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-white hover:shadow-md transition-shadow">
                    <div>
                      <p className="font-semibold text-gray-800">{contact.name}</p>
                      <p className={`text-sm ${contact.type === 'emergency' ? 'text-red-600 font-bold' : 'text-blue-600'}`}>
                        {contact.number}
                      </p>
                    </div>
                    <button className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-full text-sm font-semibold transition-colors">
                      Call
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-lg p-6 border border-green-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  <FaWhatsapp className="w-5 h-5" />
                  WhatsApp Support
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
                  Download Forms
                </button>
                <button className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-3 rounded-lg font-semibold transition-colors">
                  Service Portal
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Send us a Message</h2>
              <p className="text-gray-600 mb-8">
                Have questions about municipal services, schemes, or need assistance? 
                We're here to help you.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option value="birth-certificate">Birth Certificate</option>
                    <option value="death-certificate">Death Certificate</option>
                    <option value="property-tax">Property Tax</option>
                    <option value="water-connection">Water Connection</option>
                    <option value="sanitation">Sanitation & Waste</option>
                    <option value="building-permit">Building Permit</option>
                    <option value="complaint">Complaint</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Please describe your query or requirement in detail..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Map Section */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Us</h2>
              <div className="bg-gray-200 rounded-lg h-64 md:h-96 flex items-center justify-center w-full">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3110.4471242068907!2d79.09578907502896!3d30.51662879604548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390835e6be58cb0b%3A0x47b9eeabc1c08171!2sNagar%20Panchayat%20office%20ukhimath!5e1!3m2!1sen!2sin!4v1762774047988!5m2!1sen!2sin" style={{border:0}} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className='h-full w-full'></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Department Contacts */}
      <div className="container mx-auto px-4 mt-12">
        <div className="bg-gradient-to-r from-blue-900 to-green-900 rounded-2xl shadow-2xl p-8 text-white">
          <h2 className="text-3xl font-bold text-center mb-8">Department Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Administration", phone: "+91-1364-252101", email: "admin@ukhimath.gov.in" },
              { name: "Revenue Department", phone: "+91-1364-252102", email: "revenue@ukhimath.gov.in" },
              { name: "Public Works", phone: "+91-1364-252103", email: "pwd@ukhimath.gov.in" },
              { name: "Water Supply", phone: "+91-1364-252104", email: "water@ukhimath.gov.in" }
            ].map((dept, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-colors">
                <h3 className="font-bold text-lg mb-3">{dept.name}</h3>
                <p className="text-blue-200 font-semibold">{dept.phone}</p>
                <p className="text-green-200 text-sm mt-2">{dept.email}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaExpand, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Dummy images data - you can replace these with actual images
const galleryImages = [
  {
    id: 1,
    src: "/img/omkareshwar-temple.jpg",
    alt: "Ukhimath Temple View",
    title: "Omkareshwar Temple",
    description: "The sacred temple during winter season"
  },
  {
    id: 2,
    src: "/img/himalayan-range.jpg",
    alt: "Himalayan Mountains",
    title: "Himalayan Range",
    description: "Beautiful view of the surrounding mountains"
  },
  {
    id: 3,
    src: "/img/local-view.webp",
    alt: "Traditional Architecture",
    title: "Local Architecture",
    description: "Traditional buildings in Ukhimath"
  },
  {
    id: 4,
    src: "/img/madmaheshwar-mela.jpg",
    alt: "Cultural Festival",
    title: "Madmaheshwar Mela",
    description: "Annual cultural festival celebration"
  },
  {
    id: 5,
    src: "/img/scenic-view.jpg",
    alt: "Natural Landscape",
    title: "Scenic Beauty",
    description: "Breathtaking landscapes around Ukhimath"
  },
  {
    id: 6,
    src: "/img/urban-development.webp",
    alt: "Infrastructure Development",
    title: "Urban Development",
    description: "Modern infrastructure projects"
  },
  {
    id: 7,
    src: "/img/local-community.webp",
    alt: "Village Life",
    title: "Local Community",
    description: "Daily life in Ukhimath villages"
  },
  {
    id: 9,
    src: "/img/roads.jpg",
    alt: "Road Infrastructure",
    title: "Connectivity",
    description: "Well-maintained roads and connectivity"
  }
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openModal = (id: number) => {
    setSelectedImage(id);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % galleryImages.length;
    } else {
      newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    }
    
    setSelectedImage(galleryImages[newIndex].id);
  };

  return (
    <section id="gallery" className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-10 md:px-24">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-blue-200 mb-4">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <FaExpand className="text-blue-600 text-sm" />
            </div>
            <h2 className="text-4xl font-bold text-blue-800">Photo Gallery</h2>
          </div>
          <p className="text-xl text-blue-700 max-w-2xl mx-auto font-medium">
            Explore the beauty, culture, and development of Ukhimath Nagar Panchayat through our visual journey
          </p>
        </div>

        {/* Swiper Gallery */}
        <div className="relative gallery-swiper">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination',
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="pb-12"
          >
            {galleryImages.map((image) => (
              <SwiperSlide key={image.id}>
                <div 
                  className="bg-white rounded-2xl shadow-lg border border-blue-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => openModal(image.id)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <FaExpand className="text-white text-2xl" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-blue-800 text-lg mb-2">{image.title}</h3>
                    <p className="text-blue-600 text-sm">{image.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="swiper-button-prev absolute -left-10 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full w-12 h-12 shadow-lg border border-blue-200 flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors">
            <FaChevronLeft className="text-blue-600 text-xl" />
          </div>
          <div className="swiper-button-next absolute -right-10 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full w-12 h-12 shadow-lg border border-blue-200 flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors">
            <FaChevronRight className="text-blue-600 text-md" />
          </div>

          {/* Custom Pagination */}
          <div className="swiper-pagination top-10"></div>
        </div>

        
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white text-2xl hover:text-blue-300 transition-colors"
            >
              ✕
            </button>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateImage('prev')}
                className="text-white text-2xl hover:text-blue-300 transition-colors"
              >
                <FaChevronLeft className="w-8 h-8" />
              </button>
              
              <div className="bg-white rounded-2xl overflow-hidden">
                <img
                  src={galleryImages.find(img => img.id === selectedImage)?.src}
                  alt={galleryImages.find(img => img.id === selectedImage)?.alt}
                  className="max-w-full max-h-96 object-contain"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-bold text-blue-800 text-xl mb-2">
                    {galleryImages.find(img => img.id === selectedImage)?.title}
                  </h3>
                  <p className="text-blue-600">
                    {galleryImages.find(img => img.id === selectedImage)?.description}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => navigateImage('next')}
                className="text-white text-2xl hover:text-blue-300 transition-colors"
              >
                <FaChevronRight className="w-8 h-8" />
              </button>
            </div>
            
            <div className="text-center mt-4 text-white">
              {galleryImages.findIndex(img => img.id === selectedImage) + 1} of {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
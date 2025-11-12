"use client";
import HeroSection from "@/components/heroSection";
import AboutSection from "@/components/aboutSection";
import QuickLinks from "@/components/quickLinks";
import NewsUpdates from "@/components/newsSection";
import TourismHighlights from "@/components/tourismHighlights";
import Announcements from "@/components/announcements";
import GallerySection from "@/components/gallerySection";
import Header from "@/components/header";
import Footer from "@/components/footer";

// Main Homepage Component
const Homepage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <AboutSection />
        <Announcements />
        <QuickLinks />
        <NewsUpdates />
        <GallerySection />
        <TourismHighlights />
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;

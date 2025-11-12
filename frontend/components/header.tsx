"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import Link from "next/link";

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<number | null>(
    null
  );
  const [fontSize, setFontSize] = useState("medium");
  const [language, setLanguage] = useState("en");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Citizen Services",
      submenu: [
        { label: "Forms & Applications", href: "/services/forms-applications" },
        { label: "Downloads", href: "/services/downloads" },
        // {
        //   label: "Online Services",
        //   href: "https://serviceonline.gov.in/uttarakhand/",
        // },
        // { label: "Property Tax Payment", href: "/services/tax" },
        // { label: "Grievance Portal", href: "/services/grievance" },
      ],
    },
    {
      name: "Public Notices",
      submenu: [
        { label: "All Notices", href: "/notices" },
        { label: "Tenders", href: "/notices/tenders" },
        { label: "Announcements", href: "/notices/announcements" },
        // { label: "Circulars", href: "/notices/circulars" },
        // { label: "Employment", href: "/notices/employment" },
      ],
    },
    { name: "Schemes & Projects", href: "/schemes" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact Us", href: "/contact" },
    { name: "News & Events", href: "/news" },
  ];

  // Apply font size to document
  useEffect(() => {
    const root = document.documentElement;
    switch (fontSize) {
      case "small":
        root.style.fontSize = "14px";
        break;
      case "medium":
        root.style.fontSize = "16px";
        break;
      case "large":
        root.style.fontSize = "18px";
        break;
      default:
        root.style.fontSize = "16px";
    }
  }, [fontSize]);

  // Apply language
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownToggle = (index: number) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };

  const handleSkipToContent = () => {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFontSizeChange = (size: React.SetStateAction<string>) => {
    setFontSize(size);
  };
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    // Don't cause a re-render of the translate element
    document
      .querySelector(".goog-te-combo")
      ?.dispatchEvent(new Event("change"));
  };

  return (
    <>
      {/* Top Banner - Not Sticky */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-2 text-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6">
              <Link
                href="mailto:npukhimath@gmail.com"
                className="flex items-center space-x-2 hover:text-blue-200 transition-colors"
              >
                <IoIosMail className="text-blue-300 text-xl">📧</IoIosMail>
                <span>npukhimath@gmail.com</span>
              </Link>
              <Link
                href="tel:9412132732"
                className="flex items-center space-x-2 hover:text-blue-200 transition-colors"
              >
                <FaPhoneAlt className="text-blue-300">📞</FaPhoneAlt>
                <span>+91-94121-32732</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4 mt-2 md:mt-0">
              <button
                onClick={handleSkipToContent}
                className="hover:text-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 rounded px-2"
              >
                Skip to main content
              </button>

              <div className="flex items-center space-x-1 border-l border-blue-600 pl-4 ml-4">
                <span className="text-blue-300 text-xs">Text Size:</span>
                <button
                  onClick={() => handleFontSizeChange("small")}
                  className={`w-6 h-6 rounded transition-colors text-xs ${
                    fontSize === "small"
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-600"
                  }`}
                >
                  A-
                </button>
                <button
                  onClick={() => handleFontSizeChange("medium")}
                  className={`w-6 h-6 rounded transition-colors text-sm ${
                    fontSize === "medium"
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-600"
                  }`}
                >
                  A
                </button>
                <button
                  onClick={() => handleFontSizeChange("large")}
                  className={`w-6 h-6 rounded transition-colors text-base ${
                    fontSize === "large"
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-600"
                  }`}
                >
                  A+
                </button>
              </div>

              <div
                id="google_translate_element"
                className="translate-widget"
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Not Sticky */}
      <header className="bg-white shadow-lg border-b-4 border-orange-600">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4">
                <Image
                  src="/img/logo.svg"
                  alt="Ukhimath Logo"
                  height={100}
                  width={100}
                  className=""
                />

                <div className="flex flex-col">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                    {language === "hi"
                      ? "नगर पंचायत उखीमठ"
                      : "Ukhimath Municipal Council"}
                  </h1>
                  <p className="text-lg md:text-xl text-blue-700 font-semibold">
                    {language === "hi"
                      ? "स्वच्छ, सशक्त और विकसित उखीमठ"
                      : "Clean, Empowered & Developed Ukhimath"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {language === "hi"
                      ? "जिला रुद्रप्रयाग, उत्तराखंड • पिन: 246469"
                      : "District Rudraprayag, Uttarakhand • PIN: 246469"}
                  </p>
                  <p className="text-xs text-blue-600 font-medium mt-1">
                    {language === "hi"
                      ? "श्री केदारनाथ का शीतकालीन आसन"
                      : "Winter Seat of Lord Kedarnath"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Navigation - Sticky */}
      <nav
        className="bg-gradient-to-r from-blue-800 to-blue-900 text-white shadow-lg sticky top-16 md:top-10 z-50"
        ref={dropdownRef}
      >
        <div className="container mx-auto px-4 pb-4 md:pb-0">
          <div className="flex justify-between items-center">
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-0">
              {navItems.map((item, index) => (
                <div key={index} className="relative">
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() => handleDropdownToggle(index)}
                        className="px-5 py-4 hover:bg-blue-700 transition-all duration-200 font-medium flex items-center space-x-1 group relative"
                        aria-expanded={activeDropdown === index}
                        aria-haspopup="true"
                      >
                        <span>{item.name}</span>
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${
                            activeDropdown === index ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
                      </button>

                      {activeDropdown === index && (
                        <div className="absolute left-0 mt-0 w-72 bg-white shadow-xl rounded-b-lg border border-gray-200 z-50">
                          <div className="p-2">
                            {item.submenu.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                href={subItem.href}
                                className="flex items-center space-x-3 px-4 py-3 text-gray-800 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors duration-150 group"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <div className="w-2 h-2 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                                <span className="font-medium">
                                  {subItem.label}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="px-5 py-4 hover:bg-blue-700 transition-all duration-200 font-medium flex items-center space-x-1 group relative"
                    >
                      <span>{item.name}</span>
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-3 hover:bg-blue-700 rounded transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-blue-700 mt-1 rounded-lg shadow-lg">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-blue-600 last:border-b-0"
                >
                  {item.submenu ? (
                    <div className="relative">
                      <button
                        onClick={() => handleDropdownToggle(index)}
                        className="w-full text-left px-4 py-4 hover:bg-blue-600 font-medium flex justify-between items-center transition-colors duration-200"
                      >
                        <span>{item.name}</span>
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${
                            activeDropdown === index ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {activeDropdown === index && (
                        <div className="bg-blue-800 border-t border-blue-600">
                          {item.submenu.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.href}
                              className="block px-8 py-3 hover:bg-blue-600 text-blue-100 border-b border-blue-700 last:border-b-0 transition-colors duration-200"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setActiveDropdown(null);
                              }}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-4 py-4 hover:bg-blue-600 font-medium transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;

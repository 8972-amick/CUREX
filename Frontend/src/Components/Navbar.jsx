// Navbar.jsx
// This is a navigation bar component for your website

// Import useState - this helps us track if menus are open or closed
import { useState } from "react";

function Navbar() {
  // State variables to track menu status
  // isMobileMenuOpen: tracks if the mobile menu is showing (true) or hidden (false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // openDropdown: tracks which dropdown menu is currently open
  const [openDropdown, setOpenDropdown] = useState(null);

  // Function to open/close the mobile menu
  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Switch between true/false
    setOpenDropdown(null); // Close any open dropdowns
  }

  // Function to open/close dropdown menus on mobile
  function toggleDropdown(menuName) {
    if (openDropdown === menuName) {
      setOpenDropdown(null); // Close if already open
    } else {
      setOpenDropdown(menuName); // Open the clicked menu
    }
  }

  // Our menu structure - easy to edit!
  const menuItems = [
    {
      title: "Providers",
      hasDropdown: true,
      subItems: [
        "Find Opportunities",
        "How It Works",
        "Provider Benefits",
        "Apply Now",
      ],
    },
    {
      title: "Facilities",
      hasDropdown: true,
      subItems: [
        "Request Staff",
        "Our Process",
        "Facility Solutions",
        "Contact Us",
      ],
    },
    {
      title: "Specialties",
      hasDropdown: true,
      subItems: [
        "Physical Therapy",
        "Occupational Therapy",
        "Speech Therapy",
        "All Specialties",
      ],
    },
    {
      title: "About",
      hasDropdown: true,
      subItems: ["Our Story", "Team", "Careers", "Testimonials"],
    },
    {
      title: "Blog",
      hasDropdown: false,
      isActive: true, // This menu item will be highlighted
    },
    {
      title: "Contact",
      hasDropdown: true,
      subItems: ["Get in Touch", "Support", "Locations"],
    },
  ];

  return (
    // Main navigation container - sticks to top when scrolling
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Inner container with max width and padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with logo and menu */}
        <div className="flex items-center justify-between h-24 lg:h-28">
          {/* LOGO SECTION */}
          <a href="#" className="flex items-center gap-3">
            {/* Logo Icon */}
            <div className="w-12 h-12 lg:w-14 lg:h-14">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                <path
                  d="M50 20C50 14.4772 54.4772 10 60 10H70C75.5228 10 80 14.4772 80 20V30C80 35.5228 75.5228 40 70 40H60C54.4772 40 50 35.5228 50 30V20Z"
                  fill="#8B1538"
                />
                <path
                  d="M20 50C20 44.4772 24.4772 40 30 40H40C45.5228 40 50 44.4772 50 50V60C50 65.5228 45.5228 70 40 70H30C24.4772 70 20 65.5228 20 60V50Z"
                  fill="#8B1538"
                />
                <path
                  d="M50 70C50 64.4772 54.4772 60 60 60H70C75.5228 60 80 64.4772 80 70V80C80 85.5228 75.5228 90 70 90H60C54.4772 90 50 85.5228 50 80V70Z"
                  fill="#8B1538"
                />
                <circle cx="50" cy="50" r="8" fill="#8B1538" />
              </svg>
            </div>

            {/* Logo Text */}
            <div className="flex flex-col">
              <span className="text-2xl lg:text-3xl font-bold text-[#8B1538]">
                CUREX
              </span>
            </div>
          </a>

          {/* DESKTOP MENU - Only visible on large screens */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Loop through each menu item */}
            {menuItems.map((item, index) => (
              <div key={index} className="relative group">
                {/* Main menu button */}
                <a
                  href="#"
                  className={`
                    flex items-center gap-2 px-5 py-3 font-medium rounded transition-colors
                    ${
                      item.isActive
                        ? "bg-[#8B1538] text-white"
                        : "text-gray-700 hover:text-[#8B1538]"
                    }
                  `}
                >
                  {item.title}

                  {/* Show dropdown arrow if menu has sub-items */}
                  {item.hasDropdown && (
                    <svg
                      className="w-2 h-2 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 12 12"
                    >
                      <path d="M6 9L1 4h10z" />
                    </svg>
                  )}
                </a>

                {/* Dropdown menu - shows on hover */}
                {item.hasDropdown && (
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="py-2">
                      {/* Loop through sub-items */}
                      {item.subItems.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href="#"
                          className="block px-5 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#8B1538] transition-colors"
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* MOBILE MENU BUTTON - Hamburger icon */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden flex flex-col gap-1.5 p-2"
          >
            {/* Three lines that animate into an X when clicked */}
            <span
              className={`w-6 h-0.5 bg-[#8B1538] transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-[#8B1538] transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-[#8B1538] transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></span>
          </button>
        </div>

        {/* MOBILE MENU - Slides down when hamburger is clicked */}
        <div
          className={`lg:hidden overflow-hidden transition-all ${isMobileMenuOpen ? "max-h-screen pb-4" : "max-h-0"}`}
        >
          {menuItems.map((item, index) => (
            <div key={index} className="border-t border-gray-100">
              {/* Mobile menu item */}
              <button
                onClick={() => item.hasDropdown && toggleDropdown(item.title)}
                className={`
                  w-full flex items-center justify-between px-4 py-4 font-medium
                  ${item.isActive ? "bg-[#8B1538] text-white" : "text-gray-700"}
                `}
              >
                <span>{item.title}</span>

                {/* Show arrow for dropdown items */}
                {item.hasDropdown && (
                  <svg
                    className={`w-2 h-2 transition-transform ${openDropdown === item.title ? "rotate-180" : ""}`}
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M6 9L1 4h10z" />
                  </svg>
                )}
              </button>

              {/* Mobile dropdown - slides down when clicked */}
              {item.hasDropdown && (
                <div
                  className={`bg-gray-50 overflow-hidden transition-all ${openDropdown === item.title ? "max-h-96" : "max-h-0"}`}
                >
                  {item.subItems.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href="#"
                      className="block px-8 py-3 text-gray-600 hover:text-[#8B1538] hover:bg-gray-100"
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

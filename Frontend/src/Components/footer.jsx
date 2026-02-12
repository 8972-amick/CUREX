import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#695057] text-white">
      <div className="max-w-7xl mx-auto px-8 py-10 grid md:grid-cols-3 gap-8">
        
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-3">Curex</h3>
          <p>
            CUREX is dedicated to providing efficient healthcare staffing 
            solutions during disasters, ensuring that medical professionals 
            are quickly deployed to where they are needed most.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li className="hover:text-gray-300 cursor-pointer">Home</li>
            <li className="hover:text-gray-300 cursor-pointer">About Us</li>
            <li className="hover:text-gray-300 cursor-pointer">Services</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
          <p>Email: info@curex.org</p>
          <p>Phone: +123 456 7890</p>

          <h4 className="text-lg font-semibold mb-3 mt-5">Connect With Us</h4>
          <div className="flex gap-4 text-2xl">
            <a href="#" className="hover:text-gray-300 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 text-center py-4 text-sm">
        © 2026 Curex. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

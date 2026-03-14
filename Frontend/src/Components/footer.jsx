import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300">

      <div className="max-w-7xl mx-auto px-8 py-14 grid gap-10 md:grid-cols-3">

        {/* Brand Section */}
        <div>
          <h3 className="text-2xl font-bold text-emerald-400 mb-4">
            CUREX
          </h3>

          <p className="text-gray-400 leading-relaxed">
            CUREX connects patients, healthcare professionals, and facilities
            through AI-powered solutions and verified medical professionals.
            Our mission is to improve healthcare accessibility and efficiency.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h4>

          <ul className="space-y-3">
            <li className="hover:text-emerald-400 cursor-pointer transition">
              Home
            </li>
            <li className="hover:text-emerald-400 cursor-pointer transition">
              About Us
            </li>
            <li className="hover:text-emerald-400 cursor-pointer transition">
              Services
            </li>
            <li className="hover:text-emerald-400 cursor-pointer transition">
              Contact
            </li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Contact
          </h4>

          <p className="text-gray-400">Email: info@curex.org</p>
          <p className="text-gray-400">Phone: +123 456 7890</p>

          <h4 className="text-lg font-semibold text-white mt-6 mb-4">
            Connect With Us
          </h4>

          <div className="flex gap-4">

            <a
              href="#"
              className="p-3 bg-slate-800 rounded-lg hover:bg-emerald-500 hover:text-white transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="p-3 bg-slate-800 rounded-lg hover:bg-emerald-500 hover:text-white transition"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              className="p-3 bg-slate-800 rounded-lg hover:bg-emerald-500 hover:text-white transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="p-3 bg-slate-800 rounded-lg hover:bg-emerald-500 hover:text-white transition"
            >
              <FaLinkedinIn />
            </a>

          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-slate-700">

        <div className="max-w-7xl mx-auto px-8 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">

          <p>© 2026 CUREX. All rights reserved.</p>

          <div className="flex gap-6 mt-2 md:mt-0">
            <span className="hover:text-emerald-400 cursor-pointer transition">
              Privacy Policy
            </span>
            <span className="hover:text-emerald-400 cursor-pointer transition">
              Terms of Service
            </span>
          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;
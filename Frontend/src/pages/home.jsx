import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer.jsx";

const images = [
  "/1curex.jpg",
  "/2cu.jpg",
  "/image1.jpg",
];

const Home = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">

      {/* HERO SECTION */}
      <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">

        {/* Background Image Slider */}
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Healthcare"
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-start md:items-center">

          <div className="pt-16 md:pt-0 max-w-xl">

            {/* TEXT START ALIGNED */}
            <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
              Your health <br />
              <span className="text-emerald-400">is our priority</span>
            </h1>

            <p className="mt-6 text-gray-200 text-sm sm:text-base md:text-lg">
              CUREX connects patients, doctors, and healthcare facilities
              through AI powered healthcare solutions and verified professionals.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-md hover:bg-emerald-600 transition"
              >
                Get Started
              </button>


              <button
                onClick={() => navigate("patient/symptoms")}
                className="px-6 py-3 bg-white/10 backdrop-blur text-white border border-white/30 font-semibold rounded-md hover:bg-white hover:text-black transition"
              >
                Symptom Analysis
              </button>
            </div>

          </div>
        </div>

        {/* Slider Dots */}
        <div className="absolute bottom-6 w-full flex justify-center gap-3">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                index === current ? "bg-emerald-400" : "bg-white/50"
              }`}
            />
          ))}
        </div>

      </section>

      {/* FEATURES SECTION */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Why Choose CUREX?
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Built to simplify healthcare with trust, speed, and AI-powered solutions.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-emerald-600">
                Trusted Professionals
              </h3>
              <p className="mt-3 text-gray-600 dark:text-gray-300">
                Verified healthcare professionals ready to assist anytime.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-emerald-600">
                AI Symptom Checker
              </h3>
              <p className="mt-3 text-gray-600 dark:text-gray-300">
                Analyze symptoms instantly and get possible health insights.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-emerald-600">
                Secure Platform
              </h3>
              <p className="mt-3 text-gray-600 dark:text-gray-300">
                Fast, secure, and reliable healthcare platform.
              </p>
            </div>

          </div>

        </div>
      </section>
    
    </div>
  );
};

export default Home;
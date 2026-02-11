import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/footer.jsx";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      {/* HERO SECTION */}
      <section className="relative w-full">
        <img
          src="img1.png"
          alt="CUREX healthcare platform"
          className="w-full h-[80vh] object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent">
          <div className="max-w-7xl mx-auto h-full px-6 flex flex-col justify-center">
            <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
              Your health <br />
              <span className="text-emerald-300">is our priority</span>
            </h1>

            <p className="mt-6 max-w-xl text-gray-200 text-lg">
              CUREX connects healthcare professionals and facilities with
              trusted, flexible staffing solutions also AI featured solutions.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-md hover:bg-emerald-600 transition"
              >
                Get Started
              </button>

              <button
                onClick={() => navigate("/about")}
                className="px-6 py-3 border border-white text-white font-semibold rounded-md hover:bg-white hover:text-black transition"
              >
                Learn More
              </button>
              <button
                onClick={() => navigate("/symptoms")}
                className="px-6 py-3 bg-white/10 backdrop-blur text-white border border-white/30 font-semibold rounded-md hover:bg-white hover:text-black transition"
              >
                Symptom Analysis
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Why Choose CUREX?
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Built to simplify healthcare staffing with speed, trust, and
            flexibility.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-emerald-600">
                Trusted Professionals
              </h3>
              <p className="mt-3 text-gray-600">
                Verified healthcare providers ready to work when you need them.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-emerald-600">
                Flexible Staffing
              </h3>
              <p className="mt-3 text-gray-600">
                Short-term or long-term staffing tailored to your needs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-emerald-600">
                Fast & Secure
              </h3>
              <p className="mt-3 text-gray-600">
                Secure platform with quick matching and onboarding.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            AI integrated features
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-emerald-600">
              AI powered symptom checker
            </h3>
            <p className="mt-3 text-gray-600">
              Analyze your symptoms and get possible conditions and advice in
              seconds.
            </p>
            
          </div>

          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-emerald-600">
              Licensce verification and background checks
            </h3>
            <p className="mt-3 text-gray-600">
              AI powered verification for healthcare professionals to ensure
              trust and safety.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-emerald-600">
              Fast & Secure
            </h3>
            <p className="mt-3 text-gray-600">
              Secure platform with quick matching and onboarding.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;

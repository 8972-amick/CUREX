import React from "react";

export default function ContactUs() {
  return (
    <div className="min-h-screen flex items-center justify-center relative">

      {/* BACKGROUND IMAGE */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521791136064-7986c2920216')",
        }}
      ></div> */}

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gray-200 opacity-60"></div>

      {/* MAIN CONTAINER */}
      <div className="relative w-full max-w-6xl h-[600px] flex flex-col md:flex-row shadow-xl rounded-2xl overflow-hidden">
        
        {/* LEFT SIDE (FORM) */}
        <div className="w-full md:w-1/2 bg-slate-800/90 backdrop-blur-md text-white px-8 py-8 flex flex-col justify-center">
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-wide">
            CONTACT US
          </h1>

          <p className="text-sm text-gray-200 mb-6 italic">
            Fill out the form, and we’ll be in touch soon!
          </p>

          <form className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="First Name *"
                className="w-1/2 px-3 py-2 rounded-full bg-transparent border border-white placeholder-gray-300 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Last Name *"
                className="w-1/2 px-3 py-2 rounded-full bg-transparent border border-white placeholder-gray-300 focus:outline-none"
              />
            </div>

            <input
              type="email"
              placeholder="Email *"
              className="w-full px-3 py-2 rounded-full bg-transparent border border-white placeholder-gray-300 focus:outline-none"
            />

            <textarea
              rows="3"
              placeholder="Ask us anything..."
              className="w-full px-3 py-2 rounded-xl bg-transparent border border-white placeholder-gray-300 focus:outline-none"
            ></textarea>

            <div className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="accent-white" />
              <span>Subscribe to newsletter</span>
            </div>

            <button className="w-full border border-white py-2 rounded-full hover:bg-white hover:text-green-800 transition">
              SUBMIT
            </button>
          </form>
        </div>

        {/* RIGHT SIDE (MAP) */}
        <div className="w-full md:w-1/2 relative">
          <iframe
            title="map"
            src="https://www.google.com/maps?q=Janakpur,Nepal&output=embed"
            className="w-full h-full border-0"
          ></iframe>

          <div className="absolute inset-0 bg-white opacity-40 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
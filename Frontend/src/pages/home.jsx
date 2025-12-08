// Home page
import React from "react";

const doctors = [
  { name: "Dr. Casey Kaspol", specialty: "Vascular Surgery", avatar: "https://i.pravatar.cc/80?img=12" },
  { name: "Dr. Aisy Kaspol", specialty: "Cardiologist", avatar: "https://i.pravatar.cc/80?img=25" },
  { name: "Dr. Tamara Doi", specialty: "Cardiologist", avatar: "https://i.pravatar.cc/80?img=32" },
];

export default function Home() {
  return (
    <div className="font-sans bg-gradient-to-b from-amber-50 to-white min-h-screen text-gray-800">
      <header role="banner" className="bg-white/60 backdrop-blur sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-extrabold text-amber-700">CUREX</div>
            <span className="text-sm text-gray-500">Healthcare simplified</span>
          </div>

          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-6 text-sm text-gray-700">
            <a href="#services" className="hover:text-amber-700">Services</a>
            <a href="#doctors" className="hover:text-amber-700">Doctors</a>
            <a href="#about" className="hover:text-amber-700">About</a>
            <a href="#contact" className="hover:text-amber-700">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <button type="button" className="hidden md:inline-block bg-gradient-to-r from-amber-600 to-yellow-400 text-black px-4 py-2 rounded-lg text-sm shadow hover:opacity-95">
              Book</button>
            <a href="/login" className="text-sm text-amber-700">Sign in</a>
          </div>
        </div>
      </header>

      <main role="main" className="container mx-auto px-6 py-12">
        {/* Hero */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Your health, <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-yellow-400">properly cared for</span>
            </h1>
            <p className="text-gray-600 mb-6">Book appointments, consult specialists, and manage your care — all in one secure place.</p>

            <form className="flex gap-3 max-w-lg" 
            onSubmit={(e) => e.preventDefault()} 
            aria-label="Search doctors">
              <input aria-label="Search clinic or doctor" className="flex-1 px-4 py-3 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-200" placeholder="Search doctor, clinic or specialty" />
              <button type="submit" className="bg-gradient-to-r from-amber-600 to-yellow-400 text-black px-5 py-3 rounded-lg hover:opacity-95">Search</button>
            </form>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                <div className="text-2xl">🩺</div>
                <div>
                  <div className="text-sm text-gray-500">Available</div>
                  <div className="font-semibold">24/7 Doctors</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                <div className="text-2xl">💬</div>
                <div>
                  <div className="text-sm text-gray-500">Support</div>
                  <div className="font-semibold">Online Consultation</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl p-6 shadow-xl bg-white">
              <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fmale-doctor%3Fimage_type%3Dillustration&psig=AOvVaw1s3NXEwh8DtRJgWtLFkLmS&ust=1765248690172000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPDKofz9rJEDFQAAAAAdAAAAABAE" alt="Doctor illustration" className="w-full rounded-xl object-cover shadow" />
            </div>

            <div className="absolute -bottom-6 left-4 w-[80%] md:w-2/3 bg-white rounded-xl shadow-lg p-4 flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="text-sm text-gray-500">Available Doctors</div>
                <div className="font-semibold">See top specialists in your area</div>
              </div>
              <div className="flex gap-3 items-center">
                {doctors.slice(0,3).map((d, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <img src={d.avatar} alt={d.name} className="w-12 h-12 rounded-full object-cover" />
                    <div className="text-sm">
                      <div className="font-medium">{d.name}</div>
                      <div className="text-xs text-gray-500">{d.specialty}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quick stats */}
        <section aria-labelledby="stats-heading" className="mt-20">
          <h2 id="stats-heading" className="sr-only">Platform statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow text-center">
              <div className="text-2xl font-bold text-amber-700">1.2k+</div>
              <div className="text-sm text-gray-500">Active patients</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow text-center">
              <div className="text-2xl font-bold text-amber-700">250+</div>
              <div className="text-sm text-gray-500">Trusted specialists</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow text-center">
              <div className="text-2xl font-bold text-amber-700">98%</div>
              <div className="text-sm text-gray-500">Satisfaction rate</div>
            </div>
          </div>
        </section>

        {/* Specialists */}
        <section id="doctors" className="mt-20">
          <h2 className="text-2xl font-bold mb-6">Top Specialists</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {doctors.map((doc, idx) => (
              <article key={idx} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition" aria-labelledby={`doc-${idx}`}>
                <div className="flex items-center gap-4">
                  <img src={doc.avatar} alt={doc.name} className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <div id={`doc-${idx}`} className="font-semibold">{doc.name}</div>
                    <div className="text-sm text-gray-500">{doc.specialty}</div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mt-4">Experienced specialist with a focus on patient-centered care and evidence-based treatments.</p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500">Rating: <span className="font-medium text-gray-800">4.8</span></div>
                  <button type="button" className="text-sm bg-gradient-to-r from-amber-600 to-yellow-400 text-black px-3 py-1 rounded-lg">Book</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer role="contentinfo" className="bg-white mt-20">
        <div className="container mx-auto px-6 py-8 text-sm text-gray-600 flex flex-col md:flex-row justify-between items-center">
          <div>© {new Date().getFullYear()} CUREX. All rights reserved.</div>
          <div className="flex gap-4 mt-3 md:mt-0">
            <a href="#" className="hover:text-amber-700">Privacy</a>
            <a href="#" className="hover:text-amber-700">Terms</a>
            <a href="#contact" className="hover:text-amber-700">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

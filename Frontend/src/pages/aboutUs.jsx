import React from "react";
import Footer from "../Components/footer.jsx";

const aboutUs = () => {
  return (
    <>
      <div className="bg-[#695057] py-20">

        <section id="about">
          <div className="text-center max-w-3xl mx-auto mb-16 px-6">
            <h1 className="text-4xl font-bold text-white mb-4">About Us</h1>
            <p className="text-lg text-white leading-relaxed">
              <span className="font-semibold">Curex</span> is dedicated
                to providing efficient healthcare staffing solutions during
                disasters, ensuring that medical professionals are quickly
                deployed to where they are needed most. Our platform connects
                healthcare facilities with qualified professionals, streamlining
                the response process and improving outcomes for patients in
                critical situations. With a focus on reliability and speed, Curex
                is committed to supporting communities in times of crisis and
                enhancing the overall disaster response ecosystem.
            </p>
          </div>

          {/* Mission Vision Goals */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
            
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl hover:scale-105 transition">
              <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
              <hr className="w-16 mx-auto border-b-4 border-red-600 mb-4" />
              <p className="text-gray-600">
                To deliver reliable emergency response coordination and
                provide timely assistance during disasters.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl hover:scale-105 transition">
              <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
              <hr className="w-16 mx-auto border-b-4 border-yellow-500 mb-4" />
              <p className="text-gray-600">
                To build a safer community empowered by technology-driven
                disaster management solutions.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl hover:scale-105 transition">
              <h3 className="text-2xl font-semibold mb-2">Our Goals</h3>
              <hr className="w-16 mx-auto border-b-4 border-green-600 mb-4" />
              <p className="text-gray-600">
                Improve emergency response systems, enhance communication,
                and ensure quick deployment of rescue resources.
              </p>
            </div>

          </div>

          {/* Team Section */}
          <div className="max-w-6xl mx-auto mt-20 px-6">
            <h1 className="text-4xl font-bold text-center text-gray-800">
              Meet Our <span className="text-teal-700">Team</span>
            </h1>
            <p className="text-center mb-10 italic">
              The people powering our vision
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              
              {[
                {
                  name: "Amick Khadka",
                  role: "Frontend Manager",
                  img: "/src/assets/member1.jpeg",
                },
                {
                  name: "Anamol Niraula",
                  role: "Backend Manager",
                  img: "/src/assets/member2.jpeg",
                },
                {
                  name: "Luv Kumar Gajmer",
                  role: "Database Manager",
                  img: "/src/assets/member3.jpeg",
                },
                {
                  name: "Shusan Rai",
                  role: "UI/UX Designer",
                  img: "/src/assets/member4.jpeg",
                },
              ].map((member, index) => (
                <div
                  key={index}
                  className="bg-white shadow-xl border border-gray-200 rounded-xl p-4 hover:scale-105 transition-transform text-center"
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <h1 className="font-bold text-lg">{member.name}</h1>
                  <p className="text-gray-600 text-sm">{member.role}</p>
                </div>
              ))}

            </div>
          </div>

        </section>
      </div>

      <Footer />
    </>
  );
};

export default aboutUs;

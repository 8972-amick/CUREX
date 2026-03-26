import React from "react";

const Aboutus = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <section id="about">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">About Us</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              <span className="font-semibold text-blue-600 dark:text-blue-400">Curex</span> is a
              cutting-edge healthcare platform designed to connect patients with
              top-tier doctors and streamline the appointment booking process.
              Our mission is to make healthcare accessible, efficient, and
              patient-centric. With a user-friendly interface and a vast network
              of medical professionals, Curex empowers patients to take control
              of their health and make informed decisions about their care.
              Whether you're looking for a general practitioner, specialist, or
              urgent care, Curex has you covered with a seamless booking
              experience and trusted healthcare providers at your fingertips.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 text-center hover:shadow-2xl hover:scale-105 transition">
              <i className="fas fa-bullseye text-4xl text-blue-600 dark:text-blue-400 mb-4"></i>
              <h3 class="text-2xl font-semibold mb-2">Our Mission</h3>
              <hr class="w-16 mx-auto border-b-4 border-red-600 mb-4" />
              <p class="text-gray-600 leading-relaxed">
                To make healthcare accessible and convenient for everyone while
                supporting doctors in efficient patient management.
              </p>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl  hover:scale-105 transition">
              <i class="fas fa-lightbulb text-4xl text-yellow-500 mb-4"></i>
              <h3 class="text-2xl font-semibold mb-2">Our Vision</h3>
              <hr class="w-16 mx-auto border-b-4 border-yellow-500 mb-4" />
              <p class="text-gray-600 leading-relaxed">
                Revolutionize healthcare by providing a seamless platform that
                connects patients with trusted doctors, enhancing healthcare
                outcomes globally.
              </p>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl hover:scale-105 transition">
              <i class="fas fa-trophy text-4xl text-green-600 mb-4"></i>
              <h3 class="text-2xl font-semibold mb-2">Our Goals</h3>
              <hr class="w-16 mx-auto border-b-4 border-green-600 mb-4" />
              <p class="text-gray-600 leading-relaxed">
                Enhance healthcare services, simplify appointment booking, track
                patient records effectively, and foster a community of
                health-conscious individuals for better health outcomes.
              </p>
            </div>
          </div>

          {/* team member */}
          <div className="ml-25 mr-25 ">
            <div className=" ">
              <h1 className="mt-10 font-bold text-4xl text-center text-gray-800 ">
                {" "}
                Meet Our <span className="text-teal-700">Team</span>
              </h1>
              <p className="text-center mb-10 italic">
                The people powering our vision
              </p>
            </div>

            <div className="grid grid-cols-4 pl-14 pb-4 gap-6">
              {/* Team Member 1 */}
              <div className="bg-white shadow-2xl border border-gray-200 rounded-xl w-60 p-4 hover:scale-105 transition-transform text-center">
                <img
                  src="/src/assets/WhatsApp Image 2026-02-11 at 13.23.06.jpeg"
                  className="w-full h-40 object-cover rounded-t-xl mb-3"
                />
                <h1 className="font-bold text-lg">Amick Khadka</h1>
                <p className="text-gray-600 text-sm">Frontend Manager</p>
              </div>

              {/* Team Member 2 */}
              <div className="bg-white shadow-2xl border border-gray-200 rounded-xl w-60 p-4 hover:scale-105 transition-transform text-center">
                <img
                  src="/src/assets/WhatsApp Image 2026-02-11 at 13.27.26.jpeg"
                  className="w-full h-40 object-cover rounded-t-xl mb-3"
                />
                <h1 className="font-bold text-lg">Anamol Niroula</h1>
                <p className="text-gray-600 text-sm">Backend Manager</p>
              </div>

              {/* Team Member 3 */}
              <div className="bg-white shadow-2xl border border-gray-200 rounded-xl w-60 p-4 hover:scale-105 transition-transform text-center">
                <img
                  src="/src/assets/WhatsApp Image 2026-02-11 at 13.26.02.jpeg"
                  className="w-full h-40 object-cover rounded-t-xl mb-3"
                />
                <h1 className="font-bold text-lg">Luv Kumar Gajmer</h1>
                <p className="text-gray-600 text-sm">Database Manager</p>
              </div>

              {/* Team Member 4 */}
              <div className="bg-white shadow-2xl border border-gray-200 rounded-xl w-60 p-4 hover:scale-105 transition-transform text-center">
                <img
                  src="/src/assets/WhatsApp Image 2026-02-11 at 13.28.44.jpeg"
                  className="w-full h-40 object-cover rounded-t-xl mb-3"
                />
                <h1 className="font-bold text-lg">shusan Rai</h1>
                <p className="text-gray-600 text-sm">UI/UX Designer</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Aboutus;

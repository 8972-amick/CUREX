import React from "react";

const Aboutus = () => {
  return (
    <div className="flex h-10 bg-[#4b4446] mb-125 mt-0 pb-150">
      {/* nav bar */}

      <div className="flex-1 flex flex-col pt-20">
        {/* main content */}

        <section id="about" class="">
          <div class="text-center max-w-3xl mx-auto mb-20 px-6 ">
            <h1 class="text-4xl font-bold text-white mb-4">About Us</h1>
            <p class="text-lg text-gray-600 leading-relaxed text-white">
              <span class="font-semibold text-white"> Curex</span>{" "}
              is a cutting-edge healthcare platform designed to connect patients
              with top-tier doctors and streamline the appointment booking process.
              Our mission is to make healthcare accessible, efficient, and
              patient-centric. With a user-friendly interface and a vast network of
              medical professionals, Curex empowers patients to take control of
              their health and make informed decisions about their care. Whether
              you're looking for a general practitioner, specialist, or urgent
              care, Curex has you covered with a seamless booking experience and
              trusted healthcare providers at your fingertips.
            </p>
          </div>

          <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
            <div class="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl  hover:scale-105 transition">
              <i class="fas fa-bullseye text-4xl text-red-600 mb-4"></i>
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
                Revolutionize healthcare by providing a seamless platform that connects patients with trusted doctors, enhancing healthcare outcomes
                globally.

              </p>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl hover:scale-105 transition">
              <i class="fas fa-trophy text-4xl text-green-600 mb-4"></i>
              <h3 class="text-2xl font-semibold mb-2">Our Goals</h3>
              <hr class="w-16 mx-auto border-b-4 border-green-600 mb-4" />
              <p class="text-gray-600 leading-relaxed">
                Enhance healthcare services, simplify appointment booking, track patient records
                effectively, and foster a community of health-conscious individuals for better health outcomes.
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
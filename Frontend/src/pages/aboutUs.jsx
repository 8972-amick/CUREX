import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* ABOUT US SECTION */}
        <section id="about" className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Text */}
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About <span className="text-emerald-500 dark:text-emerald-500">Curex</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              <span className="font-semibold text-emerald-500 dark:text-emerald-500">Curex</span> is a
              cutting-edge healthcare platform that connects patients with top-tier doctors and streamlines appointments. Our mission is to make healthcare accessible, efficient, and patient-centric. Whether you're seeking a general practitioner, specialist, or urgent care, Curex has you covered.
            </p>
            <button className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-700 transition-all duration-300 font-medium">
              Learn More
            </button>
          </div>

          {/* Right Illustration */}
         <div className="md:w-1/2 flex justify-center">
  <img
    src="/src/assets/AaboutUs.avif"
    alt="Healthcare Illustration"
    className="w-full max-w-full h-auto"
  />
</div>
        </section>

        {/* MISSION, VISION, GOALS */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "fas fa-bullseye",
              iconColor: "text-blue-600 dark:text-blue-400",
              title: "Our Mission",
              borderColor: "border-blue-600",
              description:
                "To make healthcare accessible and convenient for everyone while supporting doctors in efficient patient management.",
            },
            {
              icon: "fas fa-lightbulb",
              iconColor: "text-yellow-500",
              title: "Our Vision",
              borderColor: "border-yellow-500",
              description:
                "Revolutionize healthcare by providing a seamless platform that connects patients with trusted doctors, enhancing healthcare outcomes globally.",
            },
            {
              icon: "fas fa-trophy",
              iconColor: "text-green-600",
              title: "Our Goals",
              borderColor: "border-green-600",
              description:
                "Enhance healthcare services, simplify appointment booking, track patient records effectively, and foster a community of health-conscious individuals.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 text-center hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              <i className={`${item.icon} text-4xl ${item.iconColor} mb-4`}></i>
              <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
              <hr className={`w-16 mx-auto border-b-4 ${item.borderColor} mb-4`} />
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* TEAM MEMBERS */}
        <div className="mt-28 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Meet Our <span className="text-emerald-500">Team</span>
          </h2>
          <p className="text-gray-500 italic mb-12">The people powering our vision</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6">
            {[
              {
                name: "Amick Khadka",
                role: "Full Stack Developer",
                img: "/src/assets/Amick.jpeg",
              },
              {
                name: "Anamol Niroula",
                role: "Frontend Manager",
                img: "/src/assets/Anmol.jpeg",
              },
              {
                name: "Luv Kumar Gajmer",
                role: "Database Manager",
                 img: "/src/assets/Luv.jpeg",
              },
              {
                name: "Shusan Rai",
                role: "UI/UX Designer",
                 img: "/src/assets/Susan.jpeg",
              },
            ].map((member, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-800 shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-44 object-cover"
                />
                <div className="p-5 text-center">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
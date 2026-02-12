import { useState } from "react";
import Footer from "../Components/footer.jsx";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Your message has been submitted successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-[#695057] py-20 text-center text-white">
        <h1 className="text-5xl font-bold">Get in Touch</h1>
        <p className="italic mt-4">
          Building Connections, One Message at a Time
        </p>
      </div>

      {/* Main Contact Section */}
      <div className="max-w-6xl bg-[#837e8f] mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        
        {/* Left - Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg space-y-6"
        >
          <h3 className="text-2xl font-bold text-gray-800 text-center">
            Send Us a Message
          </h3>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border p-3 rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full border p-3 rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
            required
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message..."
            rows="4"
            className="w-full border p-3 rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#695057] text-white py-3 rounded-lg shadow hover:bg-teal-800 transition"
          >
            Submit
          </button>
        </form>

        {/* Right - Emergency Contacts */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-bold">Police Emergency</h3>
            <p className="text-2xl font-semibold text-teal-700">100 / 101</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-bold">Ambulance</h3>
            <p className="text-2xl font-semibold text-teal-700">9873637221</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-bold">Fire Brigade</h3>
            <p className="text-2xl font-semibold text-teal-700">9836243541</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-bold">Rescue Teams</h3>
            <p className="text-2xl font-semibold text-teal-700">9812876543</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-xl shadow-md text-center">
            <p>Email: Thedisasterrelief@gmail.com</p>
            <p>Phone: +977 9813456782</p>
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
};

export default ContactUs;
